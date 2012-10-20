module.exports = function(grid_attributes, attrs, xs) {
	attrs = _.extend({
		item_width: 100,
		left_padding: 10,
		top_padding: 10,
		row_height: 100
	}, attrs);

	var grid_view = UI.createScrollView(_.extend({
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
              backgroundColor: 'transparent'
            }),

            addItem = function(left, view) {
              row.add(view);
              return left + attrs.item_width + attrs.left_padding;
            };

        group.reduce(addItem, 0);
        grid_view.add(row);

        return top + row.height + attrs.top_padding;
      },
		
      groupsOf = function(n, array) {
        var i,j,chunk = n, result = [];
        for (i=0,j=array.length; i<j; i+=chunk) {
          result.push(array.slice(i,i+chunk));
        }
        return result;
      },
    
      groups = groupsOf(3, xs);

	groups.reduce(createRow, 0);

	return grid_view;
};
