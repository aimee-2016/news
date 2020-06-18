import back from '../../routes/modules/back'
export function routerBeforeEachFunc (to, from, next) {
  let sdd = false;
  back[0].children.forEach(item => {
    if (item.name === to.name) {
      sdd = true
    }
  })
  // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理
   if (!sdd) {
    next()
  } else if (sessionStorage.getItem('overdue') === '1' && to.name.indexOf('billcenter') === -1 && to.name.indexOf('usercenter') === -1 && to.name !== 'home' && to.name !== 'logcenter' && to.name !== 'messagecenter') {
    next('/home/');  
  } else {
    next()
  }
}
