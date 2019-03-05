package controllers
import (
	"github.com/astaxie/beego"
	"demo/models"
)

type AuthController struct {
	beego.Controller
}

func (c *AuthController) LoginPage() {
	//name := c.GetString("name")
	//c.Data["Website"] = name
	//c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "auth/login.html"
}

func (c *AuthController) Login(){
	username := c.GetString("username")
	password := c.GetString("password")
	if username == "" || password == "" {
		c.Data["Err"] = "用户名或密码不能为空，请重新登录"
		c.TplName = "auth/login.html"
		return
	}
	// 查询数据库中的数据
	userInfo,err := models.GetDevops_authByUsername(username)

	if err != nil {
		c.Data["Err"] = "登录的用户不存在"
		c.TplName = "auth/login.html"
		return
	}
	// 判断密码是否正确
	if userInfo.Password != password {
		c.Data["Err"] = "登录用户的密码输入错误，请确认"
		c.TplName = "auth/login.html"
		return
	}

	// 判断用户的状态是否允许登录
	if userInfo.State != 1 {
		c.Data["Err"] = "该用户没有激活，请联系管理员激活账号"
		c.TplName = "auth/login.html"
		return
	}
	c.SetSession("username",username)
	c.Redirect("/",302)


}

func (c *AuthController) Logout(){
	c.DelSession("username")
	c.Redirect("/",302)
}
