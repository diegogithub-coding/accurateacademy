dashboard.on('initialized', function (se, ev) {

	filter = se.filters.$$items.find(el=>el.jaql.title == 'User Email')//Update the name of filter
	
	defaultValue = prism.user.email

	filter.jaql.filter = {
   	 	"explicit": true,
    	"multiSelection": false,
    	"members": [
        defaultValue
    	]
	}
	
	filter.locked = true
	
	var filterOptions = {
							save: true,
							refresh: true,
						}
	
	se.filters.update(filter, filterOptions)
});