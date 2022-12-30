import { hasOneOfRole } from './permission';
// import { logJson } from '@/utils/trace';

export function processNavigationItems(navItemsFull) {
  let navItems = [];

  for (let level1Item of navItemsFull) {
    if (level1Item.needRoles && !hasOneOfRole(level1Item.needRoles)) {
      continue;
    }

    let newLevel1Item = {
      ...level1Item,
    };
    delete newLevel1Item.needRoles;

    if (level1Item.children) {
      newLevel1Item.children = [];

      for (let level2Item of level1Item.children) {
        if (level2Item.needRoles && !hasOneOfRole(level2Item.needRoles)) {
          continue;
        }

        let newLevel2Item = {
          ...level2Item,
        };
        delete newLevel2Item.needRoles;

        newLevel1Item.children.push(newLevel2Item);
      }

      if (newLevel1Item.children.length == 0) {
        throw new Error('children length shouldn\'t be 0');
      }
    }

    navItems.push(newLevel1Item);
  }

  return navItems;
}