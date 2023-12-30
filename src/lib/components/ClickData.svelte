<script>
  import moment from "moment";
  import DeviceIcon from "./DeviceIcon.svelte";

  export let click;
</script>

<div style="padding: 4px;">
  <div class="bordered oneline">
    <DeviceIcon device={click.device} />

    <span class="click-timer" style="padding: 0px 6px;">{moment(new Date(click.timestamp)).format('HH:mm')}</span>
  </div>
</div>

<style>
  .click-timer{
    font-size: 11px;
    font-family: roboto;
  }
  .bordered {
    padding: 4px 6px;
    border: 1px solid gray;
    border-radius: 5px;
  }
  .oneline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
