package main

import (
	_ "demo/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

func init(){
	runmode := beego.AppConfig.String("runmode")
	mysqluser := beego.AppConfig.String(fmt.Sprintf("%s::mysqluser",runmode))
	mysqlpass := beego.AppConfig.String(fmt.Sprintf("%s::mysqlpass",runmode))
	mysqlurls := beego.AppConfig.String(fmt.Sprintf("%s::mysqlurls",runmode))
	mysqlport := beego.AppConfig.String(fmt.Sprintf("%s::mysqlport",runmode))
	mysqldb := beego.AppConfig.String(fmt.Sprintf("%s::mysqldb",runmode))
	conn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8",mysqluser,mysqlpass,mysqlurls,mysqlport,mysqldb)
	orm.RegisterDriver("mysql",orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", conn)

}
func main() {
	beego.BConfig.WebConfig.Session.SessionOn = true
	beego.Run()
}

