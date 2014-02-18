$(function(){
  var OnHoverView = Backbone.View.extend({
    template: _.template($("#on-hover-template").html()),
    className: 'hovering',
    render: function(){
      this.$el.html(this.template())
      return this;
    }
  });

  var OffHoverView = Backbone.View.extend({
    template: _.template($("#off-hover-template").html()),
    className: 'not-hovering',
    render: function(){
      this.$el.html(this.template())
      return this;
    }
  });

  var HoverView = Backbone.View.extend({
    tagName: "div",
    className: "hover-shit",

    template: _.template($("#hover-template").html()),

    initialize: function(){
      this.inside = false;
    },

    events: {
      "mouseenter .container" : 'enter',
      "mouseleave .container" : 'leave'
    },

    initialize: function(){
      this.onHoverView = new OnHoverView();
      this.offHoverView = new OffHoverView();
    },

    // Hackish way to memoize the container element once found, and or until it is found.
    // - Problem is that if it's not found, the rest of the app won't care and try to use it anyway.
    container: function(){
      if(this.container_el && this.container_el.length > 0){
        return this.container_el;
      }
      this.container_el = this.$el.find(".container");
      return this.container_el;
    },

    render: function(){
      this.$el.html(this.template());
      this.container().html(this.offHoverView.render().el);
      return this;
    },

    enter: function(){
      if(!this.inside){
        this.inside = true;
        this.container().html(this.onHoverView.render().el)
      }
    },

    leave: function(){
      if(this.inside){
        this.inside = false;
        this.container().html(this.offHoverView.render().el)  
      }
    }
  });

  var AppView = Backbone.View.extend({
    el: $("#app"),

    render: function(){
      var hover = new HoverView();
      this.$el.html(hover.render().el);
      return this;
    }
  });

  var App = new AppView();
  App.render();
});
