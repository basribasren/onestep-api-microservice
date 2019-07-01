/**
 * Permissions are crucial for a few a reasons:
 * They prevent a user from accessing an account that isn’t theirs. 
 * Imagine if your online banking application didn’t have permissions. 
 * When you logged in, you’d not only have access to your account 
 * but also every other user’s account on the application! 
 * Permissions ensure users access and modify only what they need to.
 * 
 * They restrict free accounts from getting premium features. 
 * Let’s say your website offers different feature packages. 
 * To restrict free accounts from gaining access to your premium features, 
 * you need to implement specific permissions so that every account 
 * has access to what capabilities they paid for.
 * 
 * They ensure internal accounts only have access to what they need. 
 * Your users aren’t the only ones that need permissions — your staff accounts need them, too. 
 * Information like your users’ addresses might be useful for your marketing team, 
 * but they should never have permissions to access your users’ credentials.
 */

let grantsObject = {
    admin: {
        user: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user: {
        user: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    }
};
module.exports = grantsObject
