package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	this.Data["Title"] = "必由科技"
	this.Data["username"] = this.GetSession("username")
	this.Layout = "layout/layout.html"
	this.TplName = "admin/dashboard/index.html"
	this.LayoutSections = make(map[string]string)
	this.LayoutSections["HtmlHead"] = "admin/dashboard/html_head.html"
	this.LayoutSections["Scripts"] = "admin/dashboard/scripts.html"

}
