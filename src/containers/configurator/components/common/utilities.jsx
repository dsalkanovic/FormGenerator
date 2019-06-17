export const arePropertiesShown = (item, properties) => {
    if (!item || !properties) return false;

    const { page, group, field } = properties;

    if (!!page && page.id === item.id) return true;
    if (!!group && group.id === item.id) return true;
    if (!!field && field.id === item.id) return true;

    return false;
};
