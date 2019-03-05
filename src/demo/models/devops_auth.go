package models

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/astaxie/beego/orm"
)

type Devops_auth struct {
	Id         int64
	Username   string `orm:"size(128)"`
	Password   string `orm:"size(128)"`
	CreatedOn  int
	CreatedBy  string `orm:"size(128)"`
	ModifiedOn int
	ModifiedBy string `orm:"size(128)"`
	State      int
}

func init() {
	orm.RegisterModel(new(Devops_auth))
}

// AddDevops_auth insert a new Devops_auth into database and returns
// last inserted Id on success.
func AddDevops_auth(m *Devops_auth) (id int64, err error) {
	o := orm.NewOrm()
	id, err = o.Insert(m)
	return
}

// GetDevops_authById retrieves Devops_auth by Id. Returns error if
// Id doesn't exist
func GetDevops_authById(id int64) (v *Devops_auth, err error) {
	o := orm.NewOrm()
	v = &Devops_auth{Id: id}
	if err = o.QueryTable(new(Devops_auth)).Filter("Id", id).RelatedSel().One(v); err == nil {
		return v, nil
	}
	return nil, err
}

// GetDevops_authByUsername retrieves Devops_auth by Username. Returns error if
// Id doesn't exist
func GetDevops_authByUsername(username string) (v *Devops_auth, err error) {
	o := orm.NewOrm()
	v = &Devops_auth{Username: username}
	if err = o.QueryTable(new(Devops_auth)).Filter("Username", username).RelatedSel().One(v); err == nil {
		return v, nil
	}
	return nil, err
}

// GetAllDevops_auth retrieves all Devops_auth matches certain condition. Returns empty list if
// no records exist
func GetAllDevops_auth(query map[string]string, fields []string, sortby []string, order []string,
	offset int64, limit int64) (ml []interface{}, err error) {
	o := orm.NewOrm()
	qs := o.QueryTable(new(Devops_auth))
	// query k=v
	for k, v := range query {
		// rewrite dot-notation to Object__Attribute
		k = strings.Replace(k, ".", "__", -1)
		qs = qs.Filter(k, v)
	}
	// order by:
	var sortFields []string
	if len(sortby) != 0 {
		if len(sortby) == len(order) {
			// 1) for each sort field, there is an associated order
			for i, v := range sortby {
				orderby := ""
				if order[i] == "desc" {
					orderby = "-" + v
				} else if order[i] == "asc" {
					orderby = v
				} else {
					return nil, errors.New("Error: Invalid order. Must be either [asc|desc]")
				}
				sortFields = append(sortFields, orderby)
			}
			qs = qs.OrderBy(sortFields...)
		} else if len(sortby) != len(order) && len(order) == 1 {
			// 2) there is exactly one order, all the sorted fields will be sorted by this order
			for _, v := range sortby {
				orderby := ""
				if order[0] == "desc" {
					orderby = "-" + v
				} else if order[0] == "asc" {
					orderby = v
				} else {
					return nil, errors.New("Error: Invalid order. Must be either [asc|desc]")
				}
				sortFields = append(sortFields, orderby)
			}
		} else if len(sortby) != len(order) && len(order) != 1 {
			return nil, errors.New("Error: 'sortby', 'order' sizes mismatch or 'order' size is not 1")
		}
	} else {
		if len(order) != 0 {
			return nil, errors.New("Error: unused 'order' fields")
		}
	}

	var l []Devops_auth
	qs = qs.OrderBy(sortFields...).RelatedSel()
	if _, err = qs.Limit(limit, offset).All(&l, fields...); err == nil {
		if len(fields) == 0 {
			for _, v := range l {
				ml = append(ml, v)
			}
		} else {
			// trim unused fields
			for _, v := range l {
				m := make(map[string]interface{})
				val := reflect.ValueOf(v)
				for _, fname := range fields {
					m[fname] = val.FieldByName(fname).Interface()
				}
				ml = append(ml, m)
			}
		}
		return ml, nil
	}
	return nil, err
}

// UpdateDevops_auth updates Devops_auth by Id and returns error if
// the record to be updated doesn't exist
func UpdateDevops_authById(m *Devops_auth) (err error) {
	o := orm.NewOrm()
	v := Devops_auth{Id: m.Id}
	// ascertain id exists in the database
	if err = o.Read(&v); err == nil {
		var num int64
		if num, err = o.Update(m); err == nil {
			fmt.Println("Number of records updated in database:", num)
		}
	}
	return
}

// DeleteDevops_auth deletes Devops_auth by Id and returns error if
// the record to be deleted doesn't exist
func DeleteDevops_auth(id int64) (err error) {
	o := orm.NewOrm()
	v := Devops_auth{Id: id}
	// ascertain id exists in the database
	if err = o.Read(&v); err == nil {
		var num int64
		if num, err = o.Delete(&Devops_auth{Id: id}); err == nil {
			fmt.Println("Number of records deleted in database:", num)
		}
	}
	return
}