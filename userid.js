var loginCollection  = new Meteor.Collection('useronlycollection');

//Handlebars.registerHelper('authenticated', function(options){ 
    //var user = Meteor.user();
    //if(user !== null && !user.hasOwnProperty('loading') &&
       //Roles.find().count()){
        //return options.fn(this);
    //}else{
        //return options.inverse(this);
    //}
//});

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to my contrived userid test";
  };

  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
        Meteor.call('deleteMe');
    }
  };
  Template.hello.loginitems = function(){
    return loginCollection.find();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(loginCollection.find().count() ===0){
        var i=10;
        while(i--){
            loginCollection.insert({name:"item"+i});
        }
    }
  });

  Meteor.publish(null,function(){
      if(this.userId()){
          return loginCollection.find();
      }
  });

  Meteor.methods({
    deleteMe:function(){
        Meteor.users.remove({_id:this.userId()});
    }
  });
}
