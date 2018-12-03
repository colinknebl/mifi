/**
 * Returns an object of HTML elements whose classes match a class in the elementClassNames array
 * @param target @type {HTMLElement} HTML event.target from click event
 * @param elementClassNames @type {string[]} array of class names that are desired
 */

export default function getParents(
	target: HTMLElement,
	elementClassNames?: string[]
) {
	const parents: HTMLElement[] = [target];

	function getParent(el) {
		if (el.parentElement !== null) {
			parents.push(el.parentElement);
			getParent(el.parentElement);
		}
	}

	try {
		getParent(target);

		if (elementClassNames) {
			const desiredElements = parents.filter(el => {
				let match = false;
				elementClassNames.forEach(className => {
					if (el.classList.contains(className)) {
						match = true;
					}
				});
				if (match) {
					return el;
				} else {
					return null;
				}
			});

			return desiredElements.reduce((prev, el) => {
				elementClassNames.forEach(className => {
					if (el.classList.contains(className)) {
						prev[className] = el;
					}
				});
				return prev;
			}, {});
		} else {
			return {
				parents
			};
		}
	} catch (err) {
		console.error('Error in getting parents of element clicked:', err);
		return null;
	}
}
