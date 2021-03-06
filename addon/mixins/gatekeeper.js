/**
 * mixins/gatekeeper.js
 *
 * Used to extend the ToriiSession with ArcGIS specific helper methods
 *
 */
import Ember from 'ember';


export default Ember.Mixin.create({
  /**
   * Check if the current user is in a specific role
   * In ArcGIS Online, users can only have a single role.
   */
  isInRole(role){
    let user = this.get('currentUser');
    
    if(user){
      return user.role === role;
    }else{
      return false;
    }
  },

  /**
   * Is the specified priviledge is the list of priviledges
   * assigned to the current user?
   */
  hasPrivilege(privilege){
    let user = this.get('currentUser');
    if(user){
      return (user.privileges.indexOf(privilege) > -1);
    }else{
      return false;
    }
  },

  /**
   * Does the current user have any of the passed in privileges
   */
  hasAnyPrivilege(privileges){
    let result = false;
    //check that we have an array
    if(Ember.isArray(privileges)){

      for (var i = 0; i < privileges.length; i++) {
        if (this.hasPrivilege(privileges[i])) {
          result =  true;
        }
      }

    }else{
      Ember.warn('Session.hasAnyPrivilege was not passed an array. Please use .hasPrivilege instead.');
    }
    return result;
  },

  /**
   * Allows for quick check if a user is in a set of roles
   */
  isInAnyRole(roles){
    let result = false;
    //check that we have an array
    if(Ember.isArray(roles)){

      for (var i = 0; i < roles.length; i++) {
        if (this.isInRole(roles[i])) {
          result =  true;
        }
      }

    }else{
      Ember.warn('Session.isInAnyRole was not passed an array. Please use .isInRole instead.');
    }
    return result;
  },

  /**
   * Check if the user is in a specific org.
   * This is used in conjunction with feature flags
   * to control access to features under development
   */
  isInOrg(orgId){
    let portal = this.get('portal');
    if(portal){
      return (portal.id === orgId);
    }else{
      return false;
    }
  },

  /**
   * Allows for a quick check if a user is a member of
   * any of a set of orgs
   */
  isInAnyOrg(orgs){
    let result = false;
    //check that we have an array
    if(Ember.isArray(orgs)){

      for (var i = 0; i < orgs.length; i++) {
        if (this.isInOrg(orgs[i])) {
          result =  true;
        }
      }

    }else{
      Ember.warn('Session.isInAnyOrg was not passed an array. Please use .isInOrg instead.');
    }
    return result;
  }
});
