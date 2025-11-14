<script lang="ts" module>
  export interface CmdOutputImageProps {
    /** 图片数据列表 */
    images: Array<{
      /** 图片URL或base64数据 */
      src: string;
      /** 图片标题 */
      title?: string;
      /** 图片描述 */
      description?: string;
      /** 图片宽度 */
      width?: number;
      /** 图片高度 */
      height?: number;
      /** 图片alt文本 */
      alt?: string;
    }>;
    /** 显示模式：grid网格 | carousel轮播 | single单张 */
    mode?: 'grid' | 'carousel' | 'single';
    /** 网格列数 */
    columns?: number;
    /** 是否显示标题 */
    showTitle?: boolean;
    /** 是否显示描述 */
    showDescription?: boolean;
    /** 是否可点击放大 */
    clickable?: boolean;
  }
</script>

<script lang="ts">
  import { ShEmpty } from '@istock-shell/ui';

  const {
    images,
    mode = 'grid',
    columns = 3,
    showTitle = true,
    showDescription = true,
    clickable = true,
  }: CmdOutputImageProps = $props();

  let selectedImage = $state<string | null>(null);
  let currentCarouselIndex = $state(0);

  const openModal = (src: string) => {
    if (clickable) {
      selectedImage = src;
    }
  };

  const closeModal = () => {
    selectedImage = null;
  };

  const nextCarousel = () => {
    if (images.length > 0) {
      currentCarouselIndex = (currentCarouselIndex + 1) % images.length;
    }
  };

  const prevCarousel = () => {
    if (images.length > 0) {
      currentCarouselIndex = currentCarouselIndex === 0 ? images.length - 1 : currentCarouselIndex - 1;
    }
  };

  const goToSlide = (index: number) => {
    currentCarouselIndex = index;
  };

  // 响应式网格类名
  const getGridClass = (cols: number) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
    };
    return gridClasses[cols as keyof typeof gridClasses] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };
</script>

{#if images?.length}
  <div class="p-4">
    {#if mode === 'single'}
      <!-- 单张图片模式 -->
      <div class="flex justify-center">
        <div class="card bg-base-100 shadow-lg max-w-2xl">
          <figure class="relative p-4">
            <img
              src={images[0].src}
              alt={images[0].alt || images[0].title || '图片'}
              class="w-full h-auto object-cover rounded-t-2xl {clickable
                ? 'cursor-pointer hover:opacity-90 transition-opacity'
                : ''}"
              style={images[0].width && images[0].height ? `aspect-ratio: ${images[0].width}/${images[0].height}` : ''}
              onclick={() => openModal(images[0].src)}
            />
          </figure>
          {#if (showTitle && images[0].title) || (showDescription && images[0].description)}
            <div class="card-body p-4">
              {#if showTitle && images[0].title}
                <h3 class="card-title text-lg font-semibold">{images[0].title}</h3>
              {/if}
              {#if showDescription && images[0].description}
                <p class="text-base-content/70">{images[0].description}</p>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {:else if mode === 'carousel'}
      <!-- 轮播模式 -->
      <div class="carousel w-full rounded-box shadow-lg bg-base-100">
        <div class="carousel-item relative w-full">
          <img
            src={images[currentCarouselIndex].src}
            alt={images[currentCarouselIndex].alt || images[currentCarouselIndex].title || '图片'}
            class="w-full h-96 object-cover {clickable ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}"
            onclick={() => openModal(images[currentCarouselIndex].src)}
          />

          <!-- 轮播控制按钮 -->
          {#if images.length > 1}
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button
                class="btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
                onclick={prevCarousel}
              >
                ❮
              </button>
              <button
                class="btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
                onclick={nextCarousel}
              >
                ❯
              </button>
            </div>
          {/if}
        </div>

        <!-- 轮播指示器 -->
        {#if images.length > 1}
          <div class="flex justify-center w-full py-2 gap-2 bg-base-100">
            {#each images as _, index}
              <button
                class="btn btn-xs {index === currentCarouselIndex ? 'btn-primary' : 'btn-outline'}"
                onclick={() => goToSlide(index)}
              >
                {index + 1}
              </button>
            {/each}
          </div>
        {/if}

        <!-- 图片信息 -->
        {#if (showTitle && images[currentCarouselIndex].title) || (showDescription && images[currentCarouselIndex].description)}
          <div class="p-4 bg-base-100">
            {#if showTitle && images[currentCarouselIndex].title}
              <h3 class="font-semibold text-lg mb-2">{images[currentCarouselIndex].title}</h3>
            {/if}
            {#if showDescription && images[currentCarouselIndex].description}
              <p class="text-base-content/70">{images[currentCarouselIndex].description}</p>
            {/if}
          </div>
        {/if}
      </div>
    {:else}
      <!-- 网格模式 -->
      <div class="grid {getGridClass(columns)} gap-4">
        {#each images as image, index}
          <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <figure class="relative overflow-hidden">
              <img
                src={image.src}
                alt={image.alt || image.title || `图片 ${index + 1}`}
                class="w-full h-48 object-cover {clickable
                  ? 'cursor-pointer hover:scale-105 transition-transform duration-300'
                  : ''}"
                onclick={() => openModal(image.src)}
              />
            </figure>
            {#if (showTitle && image.title) || (showDescription && image.description)}
              <div class="card-body p-3">
                {#if showTitle && image.title}
                  <h4 class="card-title text-base font-medium line-clamp-2">{image.title}</h4>
                {/if}
                {#if showDescription && image.description}
                  <p class="text-sm text-base-content/70 line-clamp-3">{image.description}</p>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- 图片预览模态框 -->
  {#if selectedImage && clickable}
    <div class="modal modal-open" onclick={closeModal}>
      <div class="modal-box max-w-4xl p-0 shadow-none" onclick={(e) => e.stopPropagation()}>
        <div class="relative p-4">
          <img src={selectedImage} alt="预览图片" class="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
          <button
            class="btn btn-sm btn-circle absolute right-2 top-2 bg-black/50 border-none text-white hover:bg-black/70"
            onclick={closeModal}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  {/if}
{:else if images && !images.length}
  <ShEmpty />
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
