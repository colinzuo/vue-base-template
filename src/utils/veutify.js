
export function processOptions(options) {
  const processed = {
    pageNum: options.page,
    pageSize: options.itemsPerPage,
  };

  if (options.sortBy?.length) {
    processed.sortBy = options.sortBy[0];
    processed.sortDesc = options.sortDesc[0];
  }
  
  return processed;
}