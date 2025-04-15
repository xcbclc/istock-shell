<!--
<script lang="ts">
  import { getStartAndEndOfWeek, toLocaleDateString } from '@istock/util';
  type TCalendarItem = {
    title: string;
    start: string;
    description: string;
    url: string;
    color: string;
  };
  interface Props {
    eventRecord?: Record<string, TCalendarItem[]>;
    type?: string;
    tags?: Array<{ tag: string; color: string }>;
  }

  const { eventRecord = {}, type = 'week', tags = [] }: Props = $props();

  const { startOfWeek } = getStartAndEndOfWeek(new Date());

  const currentWeekList = Array(5)
    .fill(0)
    .map((_, i) => {
      startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1));
      return toLocaleDateString(startOfWeek, 'YYYY-MM-DD');
    });

  const getStyle = (color: string) => {
    return ['color', color].join(':');
  };
</script>

<div class={`calendar-wrap is-${type}`}>
  <h2>{toLocaleDateString(new Date(), 'YYYY-MM-DD')}</h2>
  <div class="tags">
    {#each tags as tag}
      <div class="tag" style={getStyle(tag.color)}>
        <span>{tag.tag}</span>
      </div>
    {/each}
  </div>
  <table>
    <thead>
      {#each ['一', '二', '三', '四', '五'] as th}
        <th>周{th}</th>
      {/each}
    </thead>
    <tbody>
      <tr>
        {#each currentWeekList as week}
          <td>
            {#if eventRecord[week]}
              {#each eventRecord[week] as event}
                <div class="icalendar" style={getStyle(event.color)} title={event.description}>
                  {#if event.url}
                    <a href={event.url} target="_blank" style={getStyle(event.color)}>{event.title}</a>
                  {:else}
                    {event.title}
                  {/if}
                </div>
              {/each}
            {/if}
          </td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>

<style lang="scss">
  :root {
    &#45;&#45;ui-calendar-background-color: var(&#45;&#45;color-background);
    &#45;&#45;ui-calendar-color: var(&#45;&#45;color-text-default);
    &#45;&#45;ui-calendar-border-color: var(&#45;&#45;color-text-default);
    &#45;&#45;ui-calendar-title-gap: var(&#45;&#45;gap-zero2x);
    &#45;&#45;ui-calendar-tag-gap: var(&#45;&#45;gap-default);
    &#45;&#45;ui-calendar-font-size: var(&#45;&#45;font-size-xxl);
  }
  .calendar-wrap {
    max-width: 100%;
    max-height: 500px;
    overflow: auto;
    overflow-anchor: none;
    scroll-behavior: smooth;
    &.is-week {
      th {
        width: 20%;
      }
    }
  }
  .tags {
    margin: var(&#45;&#45;ui-calendar-title-gap) auto;
  }
  .tag {
    margin-right: var(&#45;&#45;ui-calendar-tag-gap);
    display: inline-block;
    vertical-align: middle;
    &:hover {
      opacity: 1;
    }
  }
  h2 {
    color: var(&#45;&#45;ui-calendar-color);
    margin: var(&#45;&#45;ui-calendar-title-gap) auto;
    text-align: center;
    line-height: 1.2;
    font-size: var(&#45;&#45;ui-calendar-font-size);
  }
  table {
    border-collapse: collapse;
    min-width: 100%;
    color: var(&#45;&#45;ui-calendar-color);
  }
  caption {
    font-weight: bold;
    padding: 0.5em 0;
  }
  thead {
    position: sticky;
    top: -2px;
    background-color: var(&#45;&#45;ui-calendar-background-color);
  }
  th,
  td {
    border: 1px solid var(&#45;&#45;ui-calendar-border-color);
    padding: 0.25em 0.5em;
    white-space: nowrap;
  }
  td {
    a {
      color: var(&#45;&#45;ui-calendar-color);
      text-decoration: none;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>
-->
