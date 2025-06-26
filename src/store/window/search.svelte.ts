import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';
import { searchStoreSetting } from './data/search-data';

export interface SearchStoreListItem {
  title: string;
  key: string;
  actionArgs?: any[];
  description?: string;
}
export interface SearchStoreFlatListItem {
  categoryIndex: number;
  itemIndex: number;
  item: SearchStoreListItem;
}
export interface SearchStoreCategory {
  title: string;
  key: string;
  list: SearchStoreListItem[];
}
export interface SearchStoreModel {}
export class Search extends StoreWindow<SearchStoreModel> {
  public show: boolean = $state(false);
  public list: SearchStoreCategory[] = $state([searchStoreSetting]);
  public selectedCategoryIndex: number = $state(-1);
  public selectedItemIndex: number = $state(-1);
  public searchValue: string = $state('');
  public readonly searchList: SearchStoreCategory[] = $derived.by(() => {
    const searchText = this.searchValue.trim() ?? '';
    if (!searchText) return this.list;
    return this.list
      .filter((category) => {
        if (category.title.includes(searchText)) return true;

        const filteredItems = category.list.filter(
          (item) => item.title.includes(searchText) || (item.description && item.description.includes(searchText))
        );

        return filteredItems.length > 0;
      })
      .map((category) => {
        return {
          ...category,
          list: category.list.filter(
            (item) => item.title.includes(searchText) || (item.description && item.description.includes(searchText))
          ),
        };
      });
  });
  public readonly flatList: SearchStoreFlatListItem[] = $derived.by(() => {
    const list: SearchStoreFlatListItem[] = [];
    this.searchList.forEach((category, categoryIndex) => {
      if (category.list && category.list.length > 0) {
        category.list.forEach((item, itemIndex) => {
          list.push({
            item,
            categoryIndex,
            itemIndex,
          });
        });
      }
    });
    return list;
  });
  constructor(cmdWindow: CmdWindow, config: StoreConfig<SearchStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({
      flatListChange: () => {
        this.selectedItemIndex = -1;
        this.selectedCategoryIndex = -1;
      },
    });
  }
  runAction(searchItem: SearchStoreListItem) {
    if (!searchItem.key) return;
    const { setting } = this.cmdWindow.store;
    if (searchItem.key.startsWith('Setting')) {
      const keys = searchItem.key.split('.');
      setting.selectedMenuKey = keys[keys.length - 1];
      setting.show = true;
    }
  }
  onKeydownHandle(event: KeyboardEvent) {
    const flattenedItems = this.flatList;
    const selectedCategoryIndex = this.selectedCategoryIndex;
    const selectedItemIndex = this.selectedItemIndex;
    if (event.key === 'Escape') {
      this.show = false;
    } else if (event.key === 'ArrowDown') {
      // 向下选择
      event.preventDefault();
      if (flattenedItems.length > 0) {
        const currentIndex = flattenedItems.findIndex(
          (item) => item.categoryIndex === selectedCategoryIndex && item.itemIndex === selectedItemIndex
        );
        const nextIndex = (currentIndex + 1) % flattenedItems.length;
        this.selectedCategoryIndex = flattenedItems[nextIndex].categoryIndex;
        this.selectedItemIndex = flattenedItems[nextIndex].itemIndex;
      }
    } else if (event.key === 'ArrowUp') {
      // 向上选择
      event.preventDefault();
      if (flattenedItems.length > 0) {
        const currentIndex = flattenedItems.findIndex(
          (item) => item.categoryIndex === selectedCategoryIndex && item.itemIndex === selectedItemIndex
        );
        const nextIndex = (currentIndex - 1 + flattenedItems.length) % flattenedItems.length;
        this.selectedCategoryIndex = flattenedItems[nextIndex].categoryIndex;
        this.selectedItemIndex = flattenedItems[nextIndex].itemIndex;
      }
    } else if (event.key === 'Enter') {
      // 回车键选择当前项
      if (
        this.selectedCategoryIndex >= 0 &&
        this.selectedItemIndex >= 0 &&
        this.searchList[selectedCategoryIndex]?.list?.[selectedItemIndex]
      ) {
        const selectedItem = this.searchList[selectedCategoryIndex].list[selectedItemIndex];
        this.show = false;
        this.runAction(selectedItem);
      }
    }
  }
  registerCategory(newCategory: SearchStoreCategory) {
    let categoryIndex = this.list.findIndex((category) => category.key === newCategory.key);
    if (categoryIndex === -1) {
      this.list.push(newCategory);
    } else {
      this.list.splice(categoryIndex, 1, newCategory);
    }
  }
  registerItem(categoryKey: string, newItem: SearchStoreListItem) {
    const category = this.list.find((category) => category.key === categoryKey);
    if (!category) return;
    const index = category.list.findIndex((item) => item.key === newItem.key);
    if (index === -1) {
      category.list.push(newItem);
    } else {
      category.list.splice(index, 1, newItem);
    }
  }
  checkItemSelected(categoryIndex: number, itemIndex: number) {
    return this.selectedCategoryIndex === categoryIndex && this.selectedItemIndex === itemIndex;
  }
  selectItemByIndex(categoryIndex: number, itemIndex: number) {
    if (!this.searchList[categoryIndex]?.list?.[itemIndex]) return;
    this.selectedCategoryIndex = categoryIndex;
    this.selectedItemIndex = itemIndex;
    const selectedItem = this.searchList[this.selectedCategoryIndex].list[this.selectedItemIndex];
    this.show = false;
    this.runAction(selectedItem);
  }
}
