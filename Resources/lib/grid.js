Grid = function(grid_attributes, attrs, xs) {
	attrs = merge({
		item_width: 100,
		left_padding: 10,
		top_padding: 10,
		row_height: 100
	}, attrs);

	var grid_view = Ti.UI.createScrollView(merge({
		width: Ti.UI.FILL,
		contentWidth: 310,
		showHorizontalScrollIndicator: false,
		layout: 'vertical',
		showVerticalScrollIndicator: true,
    height: Ti.UI.FILL,
    contentHeight: 'auto'
	}, grid_attributes)),

		createRow = function(top, group) {
			var row = Ti.UI.createView({
				layout: 'horizontal',
				height: Ti.UI.SIZE,
				//height: '33%',
				backgroundColor: 'transparent'
			});

			var addItem = function(left, view) {
				row.add(view);
				return left + attrs.item_width + attrs.left_padding;
			};

			group.reduce(addItem, 0);

			grid_view.add(row);

			return top + row.height + attrs.top_padding;
		},

		groups = groups_of(3, xs); // underscore

	groups.reduce(createRow, 0);

	return grid_view;
};
