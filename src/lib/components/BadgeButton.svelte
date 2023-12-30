<script>
    export let title;
    export let count;
</script>
<style>
  .notification {
    background-color: #555;
    color: white;
    text-decoration: none;
    padding: 4px 9px;
    position: relative;
    display: inline-block;
    border-radius: 2px;
  }

  .notification:hover {
    background: red;
  }

  .notification .badge {
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 2px 4px;
    border-radius: 50%;
    background-color: red;
    color: white;
  }
</style>

<button class="notification">
    <span>{title}</span>
    <span class="badge">{count}</span>
  </button>