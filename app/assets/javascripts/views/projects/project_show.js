FinalApp.Views.ProjectShow = Backbone.CompositeView.extend({
	template: JST['projects/show'],

	events: {
		"click button.destroyProject": "destroyProject", 
		"click button.newPhase": "newPhase", 
		"click button.editProject": "editProject"
	},

	initialize: function() {
		this.listenTo(this.model, "sync add", this.render);
		this.listenTo(this.collection, "sync remove", this.render);
		this.listenTo(this.collection, "add", this.addPhase);
		this.collection.fetch();

		var that = this;
		this.model.fetch();
		this.model.phases().each(function(phase){
			that.addPhase(phase);
		});
	},

	addPhase: function(phase){
		var phaseView = new FinalApp.Views.PhaseShow({
			model: phase, 
			collection: phase.tasks()
		});
		this.addSubview('#phases', phaseView);	
	},

	render: function() {
		var renderedContent = this.template({
			project: this.model
		});

		this.$el.html(renderedContent);

		this.attachSubviews();

		return this;
	},

	destroyProject: function(event) {
		event.preventDefault();
		this.model.destroy();
		Backbone.history.navigate("", { trigger: true });
	},

	newPhase: function(event) {
    	$(event.target).toggleClass('hidden');
		var newPhaseView = new FinalApp.Views.PhasesNew({
      		model: this.model,
      		collection: this.collection
		});

		this.$el.find('#phases-new').append(newPhaseView.render().$el);
	}, 

	editProject: function(event) {
		$(event.target).toggleClass('hidden');
		var editProjectView = new FinalApp.Views.ProjectEdit({
      		model: this.model,
      		collection: this.model.collection
		});

		this.$el.find('#project-edit').append(editProjectView.render().$el);
	}

});