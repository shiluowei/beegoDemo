package routers

import (
	"github.com/astaxie/beego"
	"demo/controllers"
	"github.com/astaxie/beego/context"
)

func init() {
	var filterFuc = func(ctx *context.Context) {
		username := ctx.Input.Session("username")
		if username == nil && ctx.Request.RequestURI != "/auth/login" { //  排除掉不需要验证的url
			ctx.Redirect(302,"/auth/login")
		}
	}
	beego.InsertFilter("/*",beego.BeforeRouter,filterFuc)
    beego.Router("/", &controllers.MainController{})
	// Auth url
	beego.Router("/auth/login",&controllers.AuthController{},"GET:LoginPage")
	beego.Router("/auth/login",&controllers.AuthController{},"POST:Login")
	beego.Router("/auth/logout",&controllers.AuthController{},"GET:Logout")
    beego.Include(&controllers.Devops_repoController{}) // 通过include的方法将controllers中的注释路由信息生成真实的路由信息
}
