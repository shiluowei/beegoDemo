### devops_repo table
```
bee generate scaffold \
devops_repo \
-fields="id:int64,name:string,nick_name:string,image_url:string,created_on:int,created_by:string,modified_on:int,modified_by:string,state:int" \
-conn="root:biux2123$%^@tcp(140.143.188.35:3306)/biux2Devops"
```
### devops_auth table

```
bee generate scaffold \
devops_auth \
-fields="id:int64,username:string,password:string,created_on:int,created_by:string,modified_on:int,modified_by:string,state:int" \
-conn="root:biux2123$%^@tcp(140.143.188.35:3306)/biux2Devops"
```
