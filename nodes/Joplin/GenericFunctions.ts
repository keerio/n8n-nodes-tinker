
//const imagePath = 'path/to/your/image.jpg';
//imageToDataURL(imagePath).then((dataURL) => console.log(dataURL));


// Utility function to flatten nested objects
export function flattenObject(obj: any, prefix = ''): any {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flattenObject(obj[key], `${prefix}${key}.`));
    } else {
      result[`${prefix}${key}`] = obj[key];
    }

  }
	// console.log('Catch parent_id', result)


  return result;
}

// Function to filter out null and undefined values and keep the last part of the key
// I highly doubt there is a use case when it is necessary to clean a value so '' is filtered out

export function filterValidProperties(obj: any): any {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      const lastPartOfKey = key.substring(key.lastIndexOf('.') + 1);
      result[lastPartOfKey] = obj[key];
    }
  }
	console.log('Catch binary value', result)
	if (result.image_data_url !== null && result.image_data_url !== undefined && result.image_data_url !== ''){
		console.log('data exists')
		//image_data_url = dataurlFile{}


	} else {console.log('data not exist')}

  return result;
}


// export const toOptions = (items: LoadedResource[]) =>
// 	items.map(({ name, id }) => ({ name, value: id }));



