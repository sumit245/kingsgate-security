import React from 'react'

function MailScreen() {
    return (
        <>
        <div className="wrapper wrapper-content">
        <div className="row">
          <div className="col-lg-3">
            <div className="ibox ">
              <div className="ibox-content mailbox-content">
                <div className="file-manager">
                  <a className="btn btn-block btn-primary compose-mail" href="mail_compose.html">Compose Mail</a>
                  <div className="space-25" />
                  <h5>Folders</h5>
                  <ul className="folder-list m-b-md" style={{padding: 0}}>
                    <li><a href="/mailbox"> <i className="fa fa-inbox " /> Inbox <span className="label label-warning float-right">16</span> </a></li>
                    <li><a href="/mailbox"> <i className="fa fa-envelope-o" /> Send Mail</a></li>
                    <li><a href="/mailbox"> <i className="fa fa-file-text-o" /> Drafts <span className="label label-danger float-right">2</span></a></li>
                    <li><a href="/mailbox"> <i className="fa fa-trash-o" /> Trash</a></li>
                    <li><a href="/mailbox"> <i className="fa fa-certificate" /> Important</a></li>
                  </ul>
                  <h5 className="tag-title">Labels</h5>
                  <ul className="tag-list" style={{padding: 0}}>
                    <li><a href><i className="fa fa-tag" /> Family</a></li>
                  </ul>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 animated fadeInRight">
            <div className="mail-box-header">
              <form method="get" action="index.html" className="float-right mail-search">
                <div className="input-group">
                  <input type="text" className="form-control form-control-sm" name="search" placeholder="Search email" />
                  <div className="input-group-btn">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <h2>
                Inbox (16)
              </h2>
              <div className="mail-tools tooltip-demo m-t-md">
                <div className="btn-group float-right">
                  <button className="btn btn-white btn-sm"><i className="fa fa-arrow-left" /></button>
                  <button className="btn btn-white btn-sm"><i className="fa fa-arrow-right" /></button>
                </div>
                <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh inbox"><i className="fa fa-refresh" /> Refresh</button>
                <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as read"><i className="fa fa-eye" /> </button>
                <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as important"><i className="fa fa-exclamation" /> </button>
                <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Move to trash"><i className="fa fa-trash-o" /> </button>
              </div>
            </div>
            <div className="mail-box">
              <table className="table table-hover table-mail">
                <tbody>
                  <tr className="unread">
                    <td className="check-mail">
                      <input type="checkbox" className="i-checks" />
                    </td>
                    <td className="mail-ontact"><a href="mail_detail.html">Anna Smith</a></td>
                    <td className="mail-subject"><a href="mail_detail.html">Lorem ipsum dolor noretek imit set.</a></td>
                    <td className><i className="fa fa-paperclip" /></td>
                    <td className="text-right mail-date">6.10 AM</td>
                  </tr>
                  <tr className="unread">
                    <td className="check-mail">
                      <input type="checkbox" className="i-checks" defaultChecked />
                    </td>
                    <td className="mail-ontact"><a href="mail_detail.html">Jack Nowak</a></td>
                    <td className="mail-subject"><a href="mail_detail.html">Aldus PageMaker including versions of Lorem Ipsum.</a></td>
                    <td className />
                    <td className="text-right mail-date">8.22 PM</td>
                  </tr>
                  <tr className="read">
                    <td className="check-mail">
                      <input type="checkbox" className="i-checks" />
                    </td>
                    <td className="mail-ontact"><a href="mail_detail.html">Facebook</a> <span className="label label-warning float-right">Clients</span> </td>
                    <td className="mail-subject"><a href="mail_detail.html">Many desktop publishing packages and web page editors.</a></td>
                    <td className />
                    <td className="text-right mail-date">Jan 16</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        
                </>
    )
}

export default MailScreen
