package controllers

import (
	"demo/models"
	"encoding/json"
	"errors"
	"strconv"
	"strings"

	"github.com/astaxie/beego"
)

//  Devops_repoController operations for Devops_repo
type Devops_repoController struct {
	beego.Controller
}

// URLMapping ...
func (c *Devops_repoController) URLMapping() {
	c.Mapping("Post", c.Post)
	c.Mapping("GetOne", c.GetOne)
	c.Mapping("GetAll", c.GetAll)
	c.Mapping("Put", c.Put)
	c.Mapping("Delete", c.Delete)
}

// Post ...
// @Title Post
// @Description create Devops_repo
// @Param	body		body 	models.Devops_repo	true		"body for Devops_repo content"
// @Success 201 {int} models.Devops_repo
// @Failure 403 body is empty
// @router /repos/ [post]
func (c *Devops_repoController) Post() {
	var v models.Devops_repo
	json.Unmarshal(c.Ctx.Input.RequestBody, &v)
	if _, err := models.AddDevops_repo(&v); err == nil {
		c.Ctx.Output.SetStatus(201)
		c.Data["json"] = v
	} else {
		c.Data["json"] = err.Error()
	}
	c.ServeJSON()
}

// GetOne ...
// @Title Get One
// @Description get Devops_repo by id
// @Param	id		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.Devops_repo
// @Failure 403 :id is empty
// @router /repos/:id [get]
func (c *Devops_repoController) GetOne() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseInt(idStr, 0, 64)
	v, err := models.GetDevops_repoById(id)
	if err != nil {
		c.Data["json"] = err.Error()
	} else {
		c.Data["json"] = v
	}
	c.ServeJSON()
}

// GetAll ...
// @Title Get All
// @Description get Devops_repo
// @Param	query	query	string	false	"Filter. e.g. col1:v1,col2:v2 ..."
// @Param	fields	query	string	false	"Fields returned. e.g. col1,col2 ..."
// @Param	sortby	query	string	false	"Sorted-by fields. e.g. col1,col2 ..."
// @Param	order	query	string	false	"Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ..."
// @Param	limit	query	string	false	"Limit the size of result set. Must be an integer"
// @Param	offset	query	string	false	"Start position of result set. Must be an integer"
// @Success 200 {object} models.Devops_repo
// @Failure 403
// @router /repos [get]
func (c *Devops_repoController) GetAll() {
	var fields []string
	var sortby []string
	var order []string
	var query = make(map[string]string)
	var limit int64 = 10
	var offset int64

	// fields: col1,col2,entity.col3
	if v := c.GetString("fields"); v != "" {
		fields = strings.Split(v, ",")
	}
	// limit: 10 (default is 10)
	if v, err := c.GetInt64("limit"); err == nil {
		limit = v
	}
	// offset: 0 (default is 0)
	if v, err := c.GetInt64("offset"); err == nil {
		offset = v
	}
	// sortby: col1,col2
	if v := c.GetString("sortby"); v != "" {
		sortby = strings.Split(v, ",")
	}
	// order: desc,asc
	if v := c.GetString("order"); v != "" {
		order = strings.Split(v, ",")
	}
	// query: k:v,k:v
	if v := c.GetString("query"); v != "" {
		for _, cond := range strings.Split(v, ",") {
			kv := strings.SplitN(cond, ":", 2)
			if len(kv) != 2 {
				c.Data["json"] = errors.New("Error: invalid query key/value pair")
				c.ServeJSON()
				return
			}
			k, v := kv[0], kv[1]
			query[k] = v
		}
	}

	data := make(map[string]interface{})
	l, err := models.GetAllDevops_repo(query, fields, sortby, order, offset, limit)
	data["rows"] = l
	data["total"] = models.GetCountDevops_repo()
	if err != nil {
		c.Data["json"] = err.Error()
	} else {
		c.Data["json"] = data
	}
	c.ServeJSON()
}

// Put ...
// @Title Put
// @Description update the Devops_repo
// @Param	id		path 	string	true		"The id you want to update"
// @Param	body		body 	models.Devops_repo	true		"body for Devops_repo content"
// @Success 200 {object} models.Devops_repo
// @Failure 403 :id is not int
// @router /repos/:id [put]
func (c *Devops_repoController) Put() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseInt(idStr, 0, 64)
	v := models.Devops_repo{Id: id}
	json.Unmarshal(c.Ctx.Input.RequestBody, &v)
	if err := models.UpdateDevops_repoById(&v); err == nil {
		c.Data["json"] = "OK"
	} else {
		c.Data["json"] = err.Error()
	}
	c.ServeJSON()
}

// Delete ...
// @Title Delete
// @Description delete the Devops_repo
// @Param	id		path 	string	true		"The id you want to delete"
// @Success 200 {string} delete success!
// @Failure 403 id is empty
// @router /repos/:id [delete]
func (c *Devops_repoController) Delete() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseInt(idStr, 0, 64)
	if err := models.DeleteDevops_repo(id); err == nil {
		c.Data["json"] = "OK"
	} else {
		c.Data["json"] = err.Error()
	}
	c.ServeJSON()
}
