if (Meteor.isClient) {
Template.search.onCreated( () => {
  let template = Template.instance();
	//Uses the reactive package
	template.searchQuery = new ReactiveVar();
	template.searching   = new ReactiveVar( false );

	Tracker.autorun( () => {
    template.subscribe( "albums", template.searchQuery.get(), () => {
			setTimeout( () => {
				template.searching.set( false );
			}, 300 );
		});
	});
});

Template.search.helpers({
	searching() {
		// ...
	},
	query() {
		return Template.instance().searchQuery.get();
	},
	albums() {
		let albums = Albums.find();
		if ( albums ) {
			return albums;
		}
	}
});

Template.search.events({
	"keyup [name='search']" ( event, template ) {
    let value = event.target.value.trim();

    if ( value !== "" && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }

    if ( value === "" ) {
      template.searchQuery.set( value );
    }
  }
});
}