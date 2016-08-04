(function (document, window) {
	var simpleFilter = function () {
		var $wrappers 		= document.querySelectorAll('.js-filter-wrapper'),
			wrapperCount 	= $wrappers.length,
			$triggers 		= document.querySelectorAll('.js-filter-triggers'),
			triggerCount 	= $triggers.length;

		this.els 			= {};
		this.attrs			= {
			base: 'data-filter-',
			visible: 'data-filter-visible',
			active : 'data-filter-active',
			disabled: 'data-filter-disabled',
			key: 'data-filter-key',
			value: 'data-filter-value'
		};

		for (var i = 0, $wrapper, id; i < wrapperCount; i++) {
			$wrapper = $wrappers[i];
			id = '#'+$wrapper.id;
			this.els[id] = {};
			this.els[id].items = $wrapper.querySelectorAll('.js-filter-item');
			this.els[id].filters = {};
			this.els[id].triggers = {};
		}

		for (var j = 0, $trigger, link, tar, fil; j < triggerCount; j++) {
			$trigger 	= $triggers[j];
			link 		= $trigger.querySelector('['+this.attrs.key+']');
			tar 		= link.getAttribute('href');
			fil			= link.getAttribute(this.attrs.key);
			
			this.els[tar].filters[fil] = false;
			this.els[tar].triggers[fil] = $trigger;
			$trigger.addEventListener('click', this.onTriggerClick.bind(this), false);
		}
		
		
		return {
			instances: this.els,
			reset: this.cleanFilters
		};
	};

	simpleFilter.prototype.clone = function(target) {
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null)
				for (var key in source)
					if (Object.prototype.hasOwnProperty.call(source, key))
						target[key] = source[key];
		}

		return target;
	};
	
	simpleFilter.prototype.onTriggerClick = function (ev) {
		ev.preventDefault();
		
		var el		= ev.target, target, filterK, filterV;
		if (el.nodeName === "A" && !el.hasAttribute(this.attrs.disabled)) {
			target 	= el.getAttribute('href');
			filterK = el.getAttribute(this.attrs.key);
			filterV	= el.getAttribute(this.attrs.value);

			this.cleanFilters(target);
			
			this.setActiveFilter(target, filterK, filterV);
			if (filterV !== 'reset') {
				this.newFilters(target, filterK, filterV);
			} else {
				this.newFilters(target, filterK, false);
			}

			this.checkRelevantFilters(target);
		
			return false;
		}
	};

	simpleFilter.prototype.checkRelevantFilters = function (target) {
		var instance 	= this.els[target],
			itemCount 	= instance.items.length,
			triggerCount, triggers;


		for (var fil in instance.triggers) {
			triggers = instance.triggers[fil].querySelectorAll('['+this.attrs.key+']');
			triggerCount = triggers.length;


			for (var t = 0, results = [], trigger, tempFilter, key, val; t < triggerCount; t++) {
				trigger = triggers[t];
				tempFilter = this.clone({}, instance.filters);
				key = trigger.getAttribute(this.attrs.key);
				val = trigger.getAttribute(this.attrs.value);


				if (val === 'reset')
					val = false;

				tempFilter[key] = val;
				for (var i = 0, item; i < itemCount; i++) {
					item = instance.items[i];
					if (this.filterEl(item, tempFilter)) {
						results.push(item);
					}
				}

				if (results.length > 0)
					trigger.removeAttribute(this.attrs.disabled);
				else if (results.length === 0)
					trigger.setAttribute(this.attrs.disabled, '');

				results.length = 0;
			}
		}
	};
	
	simpleFilter.prototype.setActiveFilter = function (target, key, value) {
		var instance = this.els[target];

		if (value === 'reset')
			instance.filters[key] = false;
		else
			instance.filters[key] = value;
		
		var el = instance.triggers[key],
			filters = el.querySelectorAll('['+this.attrs.key+'="'+key+'"]'),
			filterCount = filters.length;


		for (var i = 0, fil; i < filterCount; i++) {
			fil = filters[i];
			if (fil.getAttribute(this.attrs.value) === value)
				fil.setAttribute(this.attrs.active, '');
			else
				fil.removeAttribute(this.attrs.active);
		}
	};
	
	simpleFilter.prototype.cleanFilters = function (target) {
		var section = this.els[target].items,
			count 	= section.length;

		for (var i = 0, el; i < count; i++) {
			el = section[i];
			el.style.removeProperty('display');
		}
	};
	
	simpleFilter.prototype.newFilters = function (target, key, value) {
		var instance = this.els[target],
			section = instance.items,
			count	= section.length;
		
		instance.filters[key] = value;
		
		for (var i = 0, el; i < count; i++) {
			el = section[i];
			
			if (!this.filterEl(el, instance.filters)) {
				el.style.display = 'none';
				el.removeAttribute(this.attrs.visible);
			} else {
				el.setAttribute(this.attrs.visible, '');
			}
		}
	};
	
	simpleFilter.prototype.filterEl = function (el, filters) {
		var display = [],
			filter;
		
		for (var key in filters) {
			filter = filters[key];
			display.push(el.getAttribute(this.attrs.base+key) === filter || filter === false);
		}
		
		return display.every(function (f) {
			return f === true;
		});
	};
	
	window.simpleFilter = new simpleFilter();

})(document, window, undefined);