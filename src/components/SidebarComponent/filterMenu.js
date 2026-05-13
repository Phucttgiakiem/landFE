export const filterMenu = (menu, role) => {
  return menu
    .map(item => {
      if (item.children) {
        const children = filterMenu(item.children, role);
        if (children.length === 0) return null;

        return { ...item, children };
      }

      if (!item.roles.includes(role)) return null;

      return item;
    })
    .filter(Boolean);
};