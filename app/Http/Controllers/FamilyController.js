'use strict'
const Database = use('Database')
const Family = use('App/Model/Family')
const Validator = use('Validator')
const User_Family = use('App/Model/User_Family')
class FamilyController {
    *get(req,res){
        if(req.currentUser){
        const familyId = req.param('id');
        const familyInfo = yield Database.from('family').select('name').where(function(){
            this.where('id',familyId)
        })
        const familyAdminId =  yield Database.from('family').select('admin_id').where(function(){
            this.where('id',familyId)
        })
        const familyAdmin = yield Database.from('users').select('name,id').where(function(){
            this.where('id',familyAdminId)
        })
        const familyMemberIds = yield Database.from('user_families').select('user_id').where(function(){
            this.where('family_id',familyId)
        })

        let members = []
        for(memberId of familyMemberIds){
            const actualMember = Database.from('users').select('name,id').where(function(){
            this.where('id',memberId)
            members.push(actualMember)
        })
    }

     yield res.sendView('family',{
            familyInfo: familyInfo,
            familyAdminId: familyAdminId,
            familyAdmin: familyAdmin,
            members: members
		})

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


}

module.exports = FamilyController
