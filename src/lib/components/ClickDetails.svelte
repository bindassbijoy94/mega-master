<script>
  import CopyButton from "./CopyButton.svelte";
  import ExpandMore from "./icons/ExpandMore.svelte";
  import ExpandLess from "./icons/ExpandLess.svelte";
  import ClickIcon from "./icons/ClickIcon.svelte";

  import ClickData from "./ClickData.svelte";
  import { user } from "$lib/stores/user-store.js";
  export let clicks;

</script>

<div class="item">
  <!-- <div class="oneline cardpad"> -->
    <span style="display: flex;align-items: center;gap:2px">
      <svg width="13" height="16" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.65036 11.5049C4.0988 11.2896 4.62797 11.4869 4.84322 11.9354L6.90608 16.4109L8.52049 15.6485L6.44866 11.182C6.23341 10.7336 6.43073 10.1954 6.87917 9.98913L7.1303 9.91738L9.19316 9.51378L1.79379 3.29831V12.9668L3.42613 11.6484L3.65036 11.5049ZM6.85227 18.411C6.40382 18.6262 5.86568 18.4379 5.6594 17.9894L3.70417 13.7381L1.45297 15.5499C1.3005 15.6754 1.11215 15.7472 0.896894 15.7472C0.659023 15.7472 0.430894 15.6527 0.262694 15.4845C0.094494 15.3163 0 15.0882 0 14.8503V1.39689C0 1.15902 0.094494 0.930894 0.262694 0.762694C0.430894 0.594494 0.659023 0.5 0.896894 0.5C1.11215 0.5 1.31843 0.58072 1.47091 0.706286L1.47987 0.697317L11.7852 9.34337C12.1708 9.66625 12.2157 10.2313 11.9018 10.608C11.7672 10.7694 11.5789 10.8771 11.3905 10.9129L8.55636 11.469L10.5295 15.7113C10.7627 16.1598 10.5475 16.6889 10.099 16.8952L6.85227 18.411Z" fill="#D81159"/>
        </svg>
        
        <span style="color:#D81159 ;">Clicks:</span>
    </span>
  <div class="wrapped">
    {#each clicks as click}
      <ClickData {click}/>
    {/each}
  </div>
</div>

<style>
  .item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }

  .meta {
    display: flex;
  }
  .oneline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /* .cardpad {
    padding: 0.4em 1.4em;
  } */
  .wrapped {
    display: flex;
    padding: 1ch 2ch;
    flex: 1;
    overflow-x: auto;
  }

  .wrapped::-webkit-scrollbar {
    display: none;
  }


</style>
