import { firstNotEmpty, isNotEmpty } from "c/p0Funcs";

export function buildTreeMenuAncestorsMatcher(selectedMenuKey) {
  const parts = selectedMenuKey.split(".");
  let ret = new Set();
  let prev = "";
  for (let i = 0; i < parts.length; i++) {
    const curr = parts[i];
    prev = prev.length === 0 ? curr : `${prev}.${curr}`;
    ret.add(prev);
  }
  return {
    ancestors: ret,
    match: (key) => {
      // key is root, or key's parent is in the ancestors
      const lastDotIdx = key.lastIndexOf(".");
      if (lastDotIdx === -1) {
        return true;
      }
      const parentKey = key.substring(0, lastDotIdx);
      return ret.has(parentKey);
    }
  };
}

function parseItemData(item) {
  let textLine2 = null;
  let textLine3 = null;
  if (item.itemData) {
    textLine2 = firstNotEmpty(
      item.itemData.businessStructureText,
      item.itemData.rolesText,
      item.itemData.accountNumber
    );
    textLine3 = item.itemData.textLine3;
  }
  return {
    textLine2,
    textLine3
  };
}

export function buildFlatMenus(listCollector, parentKey, item, index, level) {
  const itemKey =
    parentKey.length === 0 ? item.itemKey : `${parentKey}.${item.itemKey}`;
  const hasKids = item.kids && item.kids.length > 0;
  listCollector.push({
    itemKey,
    needsDivider: level === 0 && isNotEmpty(listCollector),
    dividerKey: level === 0 ? `${itemKey}-divider` : null,
    nestedLevel: level,
    iconName: item.iconName,
    itemText: item.itemText,
    itemType: item.itemType,
    status: item.status,
    ...parseItemData(item),
    hasKids
  });
  if (hasKids) {
    item.kids.forEach((kid, kidIndex) => {
      buildFlatMenus(listCollector, itemKey, kid, kidIndex, level + 1);
    });
  }
}
