<script>
    import { goto } from "$app/navigation";
    import { login } from "$lib/users";
    import { onMount } from "svelte";

    let email = "";
    let password = "";
    let isLoading = false;
    let isSuccess = false;
    let errors = {};

    onMount(()=>{
        let usr=localStorage.getItem('user')
        if(usr) goto('/')
    })


    const handleSubmit = () => {
      errors = {};
      if (email.length === 0) {
        errors.email = "Field should not be empty";
      }
      if (password.length === 0) {
        errors.password = "Field should not be empty";
      }
      if (Object.keys(errors).length === 0) {
        isLoading = true;
        login(email, password )
          .then((usr) => {
            isSuccess = true;
            isLoading = false;
            localStorage.setItem('user',JSON.stringify(usr))
            goto('/')
            console.log('user saved',usr.uid)
          })
          .catch(err => {
            errors.server = err;
            isLoading = false;
          });
      }
    };
  </script>
  
  <style>
    form {
      background: #fff;
      padding: 50px;
      width: 250px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 20px 14px 8px rgba(0, 0, 0, 0.58);
    }
    label {
      margin: 10px 0;
      align-self: flex-start;
      font-weight: 500;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      transition: all 300ms ease-in-out;
      width: 100%;
    }
    input:focus {
      outline: 0;
      border-bottom: 1px solid #666;
    }
    button {
      margin-top: 20px;
      background: black;
      color: white;
      padding: 10px 0;
      width: 200px;
      border-radius: 25px;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: all 300ms ease-in-out;
    }
    button:hover {
      transform: translateY(-2.5px);
      box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
    }
    h1 {
      margin: 10px 20px 30px 20px;
      font-size: 40px;
    }
    .errors {
      list-style-type: none;
      padding: 10px;
      margin: 0;
      border: 2px solid #be6283;
      color: #be6283;
      background: rgba(190, 98, 131, 0.3);
    }
    .success {
      font-size: 24px;
      text-align: center;
    }

    .login {
        padding: 0;
        margin: 0;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #cd76e2, #e358ab);
        background-color: rgb(63, 59, 59);
    }
  </style>
  <section class="login">
  <form on:submit|preventDefault={handleSubmit}>
    {#if isSuccess}
      <div class="success">
        🔓
        <br />
        You've been successfully logged in.
      </div>
    {:else}
      <h1>👤</h1>
  
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Email</label>
      <input name="email" placeholder="name@example.com" bind:value={email} />
  
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Password</label>
      <input name="password" type="password" bind:value={password} />
  
      <button type="submit">
        {#if isLoading}Logging in...{:else}Log in 🔒{/if}
      </button>
  
      {#if Object.keys(errors).length > 0}
        <ul class="errors">
          {#each Object.keys(errors) as field}
            <li>{field}: {errors[field]}</li>
          {/each}
        </ul>
      {/if}
    {/if}
  </form>
</section>