angular.module('app').factory('mvIdentity', function() {
    
    // if(!!$window.bootstrappedUserObject) {
    //   currentUser = new mvUser();
    //   angular.extend(currentUser, $window.bootstrappedUserObject);
    // }
    return {
      currentUser: undefined,
      isAuthenticated: function() {
        return !!this.currentUser;
      },
    //   isAuthorized: function(role) {
    //     return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    //   }
    }
  })