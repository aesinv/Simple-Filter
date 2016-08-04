# Simple Filter
_Dependency-free. 1.09kb gzipped, 2.76kb uncompressed._

A simple script for basic front-end filtering based on keywords. Just pop in the script, toss some data attributes onto your filterable items/filters then go have a beer.

**Demo can be viewed on [Codepen](http://codepen.io/aesinv/pen/NALQXY).**

## What it does

With the data attributes applied, the script will bind to the links being used as filters and cache each instance of filterable items, which it then uses to search through on filter click. Based on the filters applied, it will:

1. Hide all filterable items not matching the current selected filters.
2. Iterate through all available filters and apply a _'disabled'_ data attribute on filters that are no longer relevant given the current selected options.

You can view a demo [here](http://codepen.io/aesinv/pen/NALQXY).

## Usage

Apart from including the script on your page, the script is pretty self-sufficient once you add the proper data attributes. At a high level, it basically builds a collection of filters based on a series of key/value pairs that are defined on your filter elements. Once a filter is clicked, it then uses that key/value pair to update an internal state and update the filterable items to reflect that internal state.

### Filters

Filters consist of 2 data attributes, 1 `.js-` class, and an `href` pointing to the ID of your main filterable items container. Because I'm a dependency-free hipster the script uses event bubbling to catch all events being emitted from filters, so the `.js-` class needs to be added on a parent element to the filters, for example a `ul`:

	<h4>Genre</h4>
	<ul class="js-filter-triggers">
		<li><a href="#filterable-items-container" data-filter-key="genre" data-filter-value="reset">All</a></li>
		<li><a href="#filterable-items-container" data-filter-key="genre" data-filter-value="Adventure">Adventure</a></li>
		<li><a href="#filterable-items-container" data-filter-key="genre" data-filter-value="Comedy">Comedy</a></li>
	</ul>

1. Add `.js-filter-triggers` class to a parent object so it can efficiently catch events.
2. Point your `href` tags to the ID of the container element you wish to filter (This allows you to have multiple filterable items per page, if you're into that sort of thing).
3. Add a `data-filter-key` attribute with the category this filter belongs to.
4. Add a `data-filter-value` attribute with the value this filter is toggling.
	4a. If you want a filter to reset that specific category, make sure the `data-filter-value` attribute equals `reset`.

There can be multiple groups/categories that you can filter, all you have to do is add another key.

### Filterable Items

Filterable items are what you're actually going to be toggling. They can be anything, they just need to:

1. Be contained inside of an ID'd container element.
2. Have an identifying `.js-` class applied to them.
3. Specify what group/category values apply to them.

For example:

	<div class="js-filter-wrapper" id="filterable-items-container">
		<div class="js-filter-item" data-filter-rating="PG" data-filter-genre="Comedy">
			Item 1
		</div>

		<div class="js-filter-item" data-filter-rating="PG" data-filter-genre="Adventure">
			Item 2
		</div>

		<div class="js-filter-item" data-filter-rating="PG-13" data-filter-genre="Adventure">
			Item 3
		</div>
	</div>

1. The container needs a `.js-filter-wrapper` and `id` attribuet so the script can detect and cache the container on load.
2. Items need a `.js-filter-item` class so the script can easily find them.
3. Items need `data-filter-[key]="[value]"` attributes corresponding to the key/value pair they associate with.
	3a. ex: if I have a filter with `data-filter-key="genre" data-filter-value="Comedy"`, the Comedy items should have a data attribute containing that key and equaling that value: `data-filter-genre="Comedy"`

### Full example
	<!-- Filters -->
	<h4>Genre</h4>
	<ul class="js-filter-triggers">
		<li><a href="#filterable-items-container" data-filter-key="genre" data-filter-value="reset">All</a></li>
		<li><a href="#filterable-items-container" data-filter-key="genre" data-filter-value="Adventure">Adventure</a></li>
		<li><a href="#filterable-items-container" data-filter-key="genre" data-filter-value="Comedy">Comedy</a></li>
	</ul>

	<h4>Rating</h4>
	<ul class="js-filter-triggers">
		<li><a href="#filterable-items-container" data-filter-key="rating" data-filter-value="reset">All</a></li>
		<li><a href="#filterable-items-container" data-filter-key="rating" data-filter-value="PG">PG</a></li>
		<li><a href="#filterable-items-container" data-filter-key="rating" data-filter-value="PG-13">PG-13</a></li>
	</ul>

	<!-- Items -->
	<div class="js-filter-wrapper" id="filterable-items-container">
		<div class="js-filter-item" data-filter-rating="PG" data-filter-genre="Comedy">
			Item 1
		</div>

		<div class="js-filter-item" data-filter-rating="PG" data-filter-genre="Adventure">
			Item 2
		</div>

		<div class="js-filter-item" data-filter-rating="PG-13" data-filter-genre="Adventure">
			Item 3
		</div>
	</div>

## Styling

Out of the box the script does not contain any styling. I don't want to force my demo styles on anybody. Below you can find all of the data attributes that you'd need to add styling, along with example styling. Please note that the toggling of items is done via applying an inline `display: none;` on elements not relevant to the current filters. There is an optional `data-filter-visible` data attribute that gets added as well in case you wanna do anything fancy.

	// Active filter
	[data-filter-active] {
		font-weight: 700;
		color: #000;
	}

	// Disabled/irrelevant-to-the-current-state filters
	[data-filter-disabled] {
		color: #ebebeb;
		cursor: default;
	}

	// OPTIONAL: Visible filterable items
	[data-filter-visible] {
		// make things look cool and stuff I guess
	}

## Extra notes

Feel free to open tickets for any issues you encounter, as well as submit some PRs. This is kind of a quickie at the moment, but I will eventually get a local build together to make updating/working on improving this. In the mean time, the easiest way to make changes quickly is via the Codepen demo linked above.

## Author

Matt Bengston
- **Email:** dorifutomatt@gmail.com / matt.bengston@icfolson.com
- **Twitter:** [@deedilus](https://twitter.com/deedilus)