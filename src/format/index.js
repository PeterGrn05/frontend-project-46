import getStylish from "./stylish.js";
const getFormName = (formName) => {
	if (formName === undefined) {
		return 'stylish';
	}
	return formName;
};

export default function makeFormat (tree, formName) {
	const format = getFormName(formName);
	if (format === 'stylish') {
		const result = getStylish(tree);
		return result;
	}
}