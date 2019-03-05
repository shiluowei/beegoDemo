package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["demo/controllers:Devops_repoController"] = append(beego.GlobalControllerRouter["demo/controllers:Devops_repoController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: `/repos`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["demo/controllers:Devops_repoController"] = append(beego.GlobalControllerRouter["demo/controllers:Devops_repoController"],
        beego.ControllerComments{
            Method: "Post",
            Router: `/repos/`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["demo/controllers:Devops_repoController"] = append(beego.GlobalControllerRouter["demo/controllers:Devops_repoController"],
        beego.ControllerComments{
            Method: "GetOne",
            Router: `/repos/:id`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["demo/controllers:Devops_repoController"] = append(beego.GlobalControllerRouter["demo/controllers:Devops_repoController"],
        beego.ControllerComments{
            Method: "Put",
            Router: `/repos/:id`,
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["demo/controllers:Devops_repoController"] = append(beego.GlobalControllerRouter["demo/controllers:Devops_repoController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: `/repos/:id`,
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

}
