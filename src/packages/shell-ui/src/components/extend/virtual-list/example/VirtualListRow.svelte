<script lang="ts">
  import {
    ShVirtualList,
    ShList,
    ShListRow,
    type VirtualListProps,
    type ListRowProps,
    type VirtualRange,
  } from '@istock-shell/ui';

  // 定义音乐列表项类型
  type MusicItem = ListRowProps & {
    id: string;
    artist: string;
    album: string;
    duration: string;
  };

  // 生成音乐列表数据（3000条）
  let list: MusicItem[] = $state(
    Array.from({ length: 3000 }).map((_, index) => {
      const artists = [
        'Taylor Swift',
        'Ed Sheeran',
        'Adele',
        'Bruno Mars',
        'Billie Eilish',
        'The Weeknd',
      ];
      const albums = ['Folklore', 'Divide', '25', '24K Magic', 'Happier Than Ever', 'After Hours'];

      return {
        id: `song-${index}`,
        artist: artists[index % artists.length],
        album: albums[index % albums.length],
        duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        text: `歌曲 ${index + 1}`,
        // 动态描述内容（模拟不同长度的歌词或介绍）
        description:
          index % 3 === 0
            ? '经典热门单曲'
            : index % 3 === 1
              ? '这首作品以令人心醉神迷的优美旋律与富含哲理、引人沉思的深刻歌词而备受赞誉，无疑是艺术家的扛鼎之作。那动人婉转的曲调与饱含赤诚、唤起广泛情感共振的歌词珠联璧合，在无数听众的灵魂深处留下不可磨灭的烙印。它自诞生之日起便引发巨大轰动，不仅迅速风靡大街小巷，唱片销量一路高歌猛进，更以强劲势头长期称霸各大音乐榜单。'
              : '这首深情款款的音乐作品，宛如一部微缩的人生诗篇，娓娓道来关于爱情的悸动、友谊的羁绊与生命的哲思。歌曲的编曲层次分明而匠心独运：弦乐如月光流淌，钢琴点缀似星子闪烁，精妙的和声设计构筑出沉浸式的听觉圣殿。其歌词更似淬炼过的诗行，用隐喻与意象编织出既朦胧又直抵人心的美学意境。正因如此，它成为无数听众的心灵伴侣——在夜深人静时抚平焦虑的褶皱，也在喧嚣白昼中注入温柔的韧性。无论地铁奔涌的晨昏或台灯晕染的午夜，当旋律响起，那糅合了治愈力与生命韧性的声波，始终能唤醒灵魂深处的共鸣，让人在浮世间获得短暂却珍贵的诗意栖居。',
        picture: {
          img: {
            class: 'size-12 rounded-lg',
            src: `https://picsum.photos/48/48?random=${index}`,
          },
        },
        actions: [
          { size: 'sm', icon: { name: 'play', size: 'sm' }, class: 'btn-ghost' },
          { size: 'sm', icon: { name: 'heart', size: 'sm' }, class: 'btn-ghost' },
          { size: 'sm', icon: { name: 'share', size: 'sm' }, class: 'btn-ghost' },
        ],
      };
    })
  );

  // 当前可视区域范围状态
  let range: VirtualRange = $state({
    start: 0,
    end: 0,
    totalHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  // 虚拟列表组件实例引用
  let virtualList: ShVirtualList;

  // 统计信息
  let playingIndex = $state(-1);
  let favoriteSet = $state(new Set<string>());

  // 可视区域变化回调
  const onRangeChange = (newRange: VirtualRange) => {
    range = newRange;
  };

  // 切换描述长度（演示动态高度）
  const toggleDescriptionLength = () => {
    list = list.map((item, index) => {
      // 随机改变描述长度
      const rand = Math.random();
      if (rand < 0.33) {
        item.description = '经典热门单曲';
      } else if (rand < 0.66) {
        item.description =
          '这首作品以其令人陶醉的优美旋律和发人深省的深刻歌词而享有盛誉，被广泛认为是艺术家的核心代表作。动人婉转的曲调与饱含真情实感、引人共鸣的歌词相得益彰，在听众心底烙下深刻印记，故一经问世便引发轰动，并长久占据热门金曲榜单，拥有着穿越时光的恒久魅力。';
      } else {
        item.description =
          '这是一首充满情感的歌曲，讲述了关于爱情、友谊和人生感悟的故事。歌曲的编曲精美，歌词富有诗意，深受听众喜爱。无论是在安静的夜晚还是繁忙的白天，这首歌都能带给人们内心的平静和力量。';
      }
      return item;
    });
  };

  // 播放歌曲
  const playSong = (index: number) => {
    playingIndex = playingIndex === index ? -1 : index;
  };

  // 切换收藏
  const toggleFavorite = (id: string) => {
    if (favoriteSet.has(id)) {
      favoriteSet.delete(id);
    } else {
      favoriteSet.add(id);
    }
    favoriteSet = new Set(favoriteSet); // 触发响应式更新
  };

  // 获取列表项样式
  const getItemStyle = (index: number) => {
    if (virtualList) {
      return `top: ${virtualList.getItemTop(index) || 0}px`;
    }
    return '';
  };

  // 创建增强的列表项数据
  const enhancedList = $derived.by(() => {
    return list.map((item, globalIndex) => ({
      ...item,
      // 重写actions以包含交互逻辑
      actions: [
        {
          size: 'sm',
          icon: { name: playingIndex === globalIndex ? 'pause' : 'play', size: 'sm' },
          class: `btn-ghost ${playingIndex === globalIndex ? 'text-primary' : ''}`,
          onclick: () => playSong(globalIndex),
        },
        {
          size: 'sm',
          icon: { name: 'heart', size: 'sm' },
          class: `btn-ghost ${favoriteSet.has(item.id) ? 'text-red-500' : ''}`,
          onclick: () => toggleFavorite(item.id),
        },
      ],
      // 添加额外信息显示
      text: `${item.text} - ${item.artist}`,
      description: `${item.description} | 专辑: ${item.album} | 时长: ${item.duration}`,
    }));
  });
</script>

<!-- 控制面板 -->
<div class="mb-4 flex flex-wrap gap-2 items-center">
  <div class="badge badge-outline">
    可见范围: {range.start} - {range.end}
  </div>
  <div class="badge badge-secondary">
    正在播放: {playingIndex >= 0 ? `歌曲 ${playingIndex + 1}` : '无'}
  </div>
  <div class="badge badge-accent">
    收藏: {favoriteSet.size} 首
  </div>
  <div class="badge badge-info">
    总计: {list.length} 首歌曲
  </div>
</div>

<button class="btn btn-primary btn-sm" onclick={toggleDescriptionLength}> 🎲 随机高度 </button>

<!-- 虚拟列表容器 -->
<ShVirtualList
  bind:this={virtualList}
  list={enhancedList}
  {onRangeChange}
  class="w-full h-120 border border-base-300 rounded-lg bg-base-50"
  estimateSize={80}
>
  <ShList class="relative" style={`height: ${range.totalHeight}px`}>
    {#each enhancedList.slice(range.start, range.end + 1) as item, index (item.id)}
      <!-- 动态渲染可视区域内的音乐列表项 -->
      <ShListRow
        {...item}
        class="w-full absolute left-0 hover:bg-base-100 transition-all duration-100 {playingIndex ===
        range.start + index
          ? 'bg-primary/10 border-l-4 border-primary'
          : ''}"
        style={getItemStyle(index)}
        data-index={range.start + index}
        onRender={(node: HTMLElement) => {
          virtualList?.onItemResize(node);
        }}
      />
    {/each}
  </ShList>
</ShVirtualList>
