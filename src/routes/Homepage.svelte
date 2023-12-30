<script>
  import ClickdetailsWrap from "$lib/components/ClickdetailsWrap.svelte";

  var hostUrl1 = "megapersonols_com";
</script>

<!-- <DashboardInfo/> -->

<div class="card-container">
  <div class="card-box">
    <ClickdetailsWrap hostUrl={hostUrl1} />
  </div>
</div>

<style>
  .card-container {
    padding: 8px 8px;
    display: grid;
    place-items: center;
  }
  .card-box {
    overflow-x: auto;
    border-radius: 8px;
    background-color: white;
    max-width: 600px;
    width: 100%;
  }
  .card-box {
    white-space: nowrap;
  }

  .card-box::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .card-box::-webkit-scrollbar-thumb {
    background-color: #4c52a1;
}
.card-box:hover::-webkit-scrollbar-thumb {
    background-color: #4c52a1;
}

.card-box::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
