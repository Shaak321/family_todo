'use strict'
const Database = use('Database')
const Family = use('App/Model/Family')
const Validator = use('Validator')
const User_Family = use('App/Model/User_Family')
const User = use('App/Model/User')
class FamilyController {
    *get(req,res){
        if(req.currentUser){
            const familyId = req.param('id');
            let MembersOfCurrentFamily = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',familyId)
            })
            let memb = []
            for(let MembersOfCF of MembersOfCurrentFamily){
                memb.push(MembersOfCF.username)
            }
            
        if(memb.indexOf(req.currentUser.username)> -1){
            const familyInfo = yield Database.from('families').select('name','id').where(function(){
                this.where('id',familyId)
            })
            const familyAdminId =  yield Database.from('families').select('admin_id').where(function(){
                this.where('id',familyId)
            })
            const familyAdmin = yield Database.from('users').select('name','id').where(function(){
                this.where('id',familyAdminId[0].admin_id)
            })
            var familyMemberUsernames = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',familyId)
            })
            
            let members = []
            for(let memberUsername of familyMemberUsernames){
                var actualMember = yield Database.from('users').select('name','id').where(function(){
                this.where('username',memberUsername.username) 
            })
            members.push(actualMember)
        }   

        yield res.sendView('family',{
                familyInfo: familyInfo,
                familyAdmin: familyAdmin,
                members: members
            })
    }
  }else{
     res.sendView('register') 
  }
}

    *add(req,res){
        if(req.currentUser){
            yield res.sendView('add_family')
        }else{
            yield res.sendView('register')
        }
    }
    *doAdd(req,res){
        if(req.currentUser){
             var addFamilyMessage = {
            success: 'Whoooooo! You have just added a family!',
        }
        const data = {
          name: req.input('name'),
         
        }
        const rules = {
          name: 'required|min:5', 
        }
         const validation = yield Validator.validateAll(data, rules)
        if(validation.fails()){
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            res.redirect('/addFamily')
            return
        }
         const family = new Family()
        family.name = data.name
        family.admin_id = req.currentUser.id
        const user_family = new User_Family()
        yield family.save()
        user_family.username = req.currentUser.username
        user_family.family_id = family.id
        yield user_family.save()
       
        yield res.sendView('add_family', { addFamilyMessage : addFamilyMessage.success })
        }else{
            yield res.sendView('register')
        }
    }

    *delete(req,res){
        if(req.currentUser){
            let familyId = req.param('id')
            let family = yield Family.findBy('id',familyId)
            let AdminOfFamily = yield User.findBy('id',family.admin_id)
            if(AdminOfFamily.username == req.currentUser.username){
               yield Database.from('user_families').delete().where(function(){
                   this.where('family_id',familyId)
               })
               yield family.delete()
               yield res.sendView('index')
            }
        }else{
            yield res.sendView('register')
        }
    }

    *modify(req,res){
        if(req.currentUser){
             let familyId = req.param('id')
            let family = yield Family.findBy('id',familyId)
            let AdminOfFamily = yield User.findBy('id',family.admin_id)
            if(AdminOfFamily.username == req.currentUser.username){
                yield res.sendView('editFamily',{
                    family:family
                })
            }
        }else{
            yield res.sendView('register')
        }
    }

     *doModify(req,res){
        if(req.currentUser){
             let familyId = req.param('id')
            let family = yield Family.findBy('id',familyId)
            let AdminOfFamily = yield User.findBy('id',family.admin_id)
            if(AdminOfFamily.username == req.currentUser.username){
                            var modifyFamilyMessage = {
                        success: 'Whoooooo! You have just modified your family!',
                    }
                    const data = {
                    name: req.input('name'),
                    
                    }
                    const rules = {
                    name: 'required|min:5', 
                    }
                    const validation = yield Validator.validateAll(data, rules)
                    if(validation.fails()){
                        yield req
                            .withAll()
                            .andWith({ errors: validation.messages() })
                            .flash()
                        res.redirect('/family_modify/'+familyId)
                        return
                    }
                    
                    family.name = data.name
                    yield family.save()
                    yield res.sendView('editFamily', { modifyFamilyMessage : modifyFamilyMessage.success, family:family })
            }
        }else{
            yield res.sendView('register')
        }
    }

    *addMember(req,res){
        if(req.currentUser){
            const familyId = req.param('id');
            let MembersOfCurrentFamily = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',familyId)
            })
            let memb = []
            for(let MembersOfCF of MembersOfCurrentFamily){
                memb.push(MembersOfCF.username)
            }
             if(memb.indexOf(req.currentUser.username)> -1){
                 let family = yield Family.findBy('id',familyId)
                 yield res.sendView('addMemberToFamily',{
                     family:family
                 })
             }
        }else{
            yield res.sendView('register')
        }
    }
    *doAddMember(req,res){
         if(req.currentUser){
            const familyId = req.param('id');
            let MembersOfCurrentFamily = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',familyId)
            })
            let memb = []
            for(let MembersOfCF of MembersOfCurrentFamily){
                memb.push(MembersOfCF.username)
            }
             if(memb.indexOf(req.currentUser.username)> -1){

                                var addMemberMessage = {
                            success: 'Whoooooo! You just added a member to your family!',
                        }

                        const data = {
                        username:  req.input('member_name')
                        }

                    

                        const rules = {
                        username:  'required|min:3'
                        }

                        const validation = yield Validator.validateAll(data, rules)
                        if(validation.fails()){
                            
                            yield req
                                .withAll()
                                .andWith({ errors: validation.messages() })
                                .flash()

                            res.redirect('/add_family_member/'+familyId)
                            return
                        }
                        let userToAdd = yield User.findBy('username',data.username)
                        
                        if(userToAdd){
                        const user_family = new User_Family()
                        user_family.family_id = familyId
                        user_family.username = data.username
                        yield user_family.save()

                        yield res.sendView('addMemberToFamily', { addMemberMessage : addMemberMessage.success })
                        }else{   
                            yield req
                                .withAll()
                                .andWith({ errors: [{message: "No such username"}] })
                                .flash()

                            res.redirect('/add_family_member/'+familyId)
                            return
                          
                        }
             }else{
                 
                 yield res.sendView('error')
             }
        }else{
            yield res.sendView('register')
        }
    }
}

module.exports = FamilyController
