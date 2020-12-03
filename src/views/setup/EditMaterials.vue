<template>
  <div>
    <div>
      <van-cell title="头像" class="avatar" @click="modal.avatar = true">
        <template #right-icon>
          <van-image round :src="userInfo.headImgPath" />
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell
        title="用户名"
        is-link
        :value="userInfo.nickName || '待完善'"
        @click="modal.user = true"
      />
      <van-cell
        title="介绍"
        is-link
        :value="userInfo.synopsis || '待完善'"
        @click="modal.introduce = true"
      />
      <van-cell
        title="性别"
        is-link
        :value="userInfo.sex ? userInfo.sex.message : '待完善'"
        @click="modal.sex = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="userInfo.birthday || '待完善'"
        @click="modal.birthday = true"
      />
      <van-cell
        title="地区"
        is-link
        :value="userInfo.address || '待完善'"
        @click="showDialog"
      />
    </div>
    <van-uploader ref="uploadAvatar" :after-read="afterRead" style="position:absolute;z-index:-100" />
    <van-action-sheet
      v-model="modal.avatar"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <van-action-sheet v-model="modal.user">
      <div class="content-user">
        <van-field
          v-model="user"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="20"
          placeholder="请输入用户名"
          show-word-limit
        />
        <div class="operate">
          <span>支持中英文、数字</span>
          <self-button class="btn" @click="modifyUserName(user)"
            >确定</self-button
          >
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="modal.introduce">
      <div class="content-user">
        <van-field
          v-model="introduce"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="60"
          placeholder="请介绍一下自己"
          show-word-limit
        />
        <div class="operate">
          <span>支持中英文、数字</span>
          <self-button class="btn" @click="modifySynopsis(introduce)"
            >确定</self-button
          >
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet
      v-model="modal.sex"
      :actions="actionssex"
      cancel-text="取消"
      close-on-click-action
      @select="modifySex"
    />
    <van-action-sheet v-model="modal.birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        confirm-button-text="完成"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="modifyBirthday"
        @cancel="modal.birthday = false"
      />
    </van-action-sheet>
  </div>
</template>

<script type="text/ecmascript-6">
import selfButton from '@/components/button'
import { mapActions } from "vuex";
import moment from 'moment'
import {
  Cell,
  ActionSheet,
  Field,
  DatetimePicker,
  Image,
  Icon,
  Uploader
} from "vant";
export default {
  data() {
    return {
      actions: [{name: '拍照'},{name: "从相册上传" }],  
      modal: {
        introduce: false,
        sex: false,
        birthday: false,
        zone: false,
        avatar: false,
        user: false,
      },
      user: '',
      introduce: '',
      actionssex: [{ name: "男",val: 'Man' }, { name: "女",val: 'WoMan' }],
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2020, 0, 1),
      currentDate: new Date(2019,0,1),
      cascadeData: []
    }
  },
  created() {
    this.getZoneAll()
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    afterRead(file) {
      let formdata = new FormData();
      formdata.append("filename", file.file.name);
      formdata.append("file", file.file);
      this.$ajax
        .post("api/obs/upload.json", formdata)
        .then((res) => {
          this.modifyAvatar(res.data.viewUrl)
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    showDialog() {
       this.cascadePicker.show()
    },
    modifyAvatar(val) {
      this.$ajax
        .post("api/front/member/update.json", {
          headImgPath: val
        })
        .then(() => {
          this.getUserInfo()
          this.$toast('修改成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    onSelect() {
      let domObj = this.$refs['uploadAvatar']
        console.log(domObj)
        domObj.chooseFile()
      // if(item.name==='从相册上传') {
      //   let domObj = this.$refs['uploadAvatar']
      //   console.log(domObj)
      //   domObj.chooseFile()
      // } else if(item.name==='拍照'){

      // }
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else {
        return `${val}日`;
      }
    },
    modifyUserName(user) {
      if(!user) {
        this.$toast('请输入用户名')
        return false
      }
      this.modal.user = false
        this.$ajax
        .post("api/front/member/update.json", {
          nickName: user
        })
        .then(() => {
          this.getUserInfo()
          this.$toast('修改成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    modifySynopsis(val) {
      if(!val) {
        this.$toast('请输入简介')
        return false
      }
      this.modal.introduce = false
        this.$ajax
        .post("api/front/member/update.json", {
          synopsis: val
        })
        .then(() => {
          this.getUserInfo()
          this.$toast('修改成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    modifySex(item) {
      this.$ajax
        .post("api/front/member/update.json", {
          sex: item.val
        })
        .then(() => {
          this.getUserInfo()
          this.$toast('修改成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    modifyBirthday(val) {
      this.modal.birthday = false
      let date = moment(val).format('YYYY-MM-DD')
      this.$ajax
        .post("api/front/member/update.json", {
          birthday: date
        })
        .then(() => {
          this.getUserInfo()
          this.$toast('修改成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    getZoneAll() {
      this.$ajax
        .post("api/front/member/findRegionAll.json", {})
        .then((res) => {
          res.data.forEach(element => {
            element.provinceDtoList.forEach(inner=> {
              if(!inner.cityDtoList.length) {
                delete inner.cityDtoList
              }
            })
          });
          let stringData = JSON.stringify(res.data)
          stringData = stringData.replace(/provinceDtoList/g, 'children')
          stringData = stringData.replace(/cityDtoList/g, 'children')
          this.cascadeData = JSON.parse(stringData)
          this.cascadePicker = this.$createCascadePicker({
            title: '',
            data: this.cascadeData,
            selectedIndex: [0, 1, 0],
            onSelect: this.selectHandle,
            confirmTxt: '完成',
            alias: {
                value: 'id',
                text: 'cnName'
              }
          })
        })
    },
    selectHandle(selectedVal) {
      this.$ajax
        .post("api/front/member/update.json", {
          region: selectedVal
        })
        .then(() => {
          this.getUserInfo()
          this.$toast('修改成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {

  },
  components: {
    "van-cell": Cell,
    "van-action-sheet": ActionSheet,
    'self-button': selfButton,
    'van-field': Field,
    'van-datetime-picker': DatetimePicker,
    "van-image": Image,
    "van-icon": Icon,
    "van-uploader": Uploader
  }
}
</script>

<style lang="scss" scoped>

.content-user {
  padding: 15px;
  .van-cell {
    background: #f4f4f4;
  }
  .operate {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #999999;
    }
    .btn {
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
.avatar {
  display: flex;
  align-items: center;
  .van-image {
    margin-right: 6px;
    width: 35px;
    height: 35px;
  }
  .van-icon {
    font-size: 16px;
    color: #969799;
  }
}
// 三级联动组件样式
.van-picker {
  position: relative;
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}
.van-picker__toolbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  height: 2.93333rem;
}
.van-picker__cancel,
.van-picker__confirm {
  height: 100%;
  padding: 0 1.06667rem;
  font-size: 0.93333rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.van-picker__cancel {
  color: #969799;
}
.van-picker__confirm {
  color: #576b95;
}
.van-picker__columns {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  cursor: grab;
}
.van-picker-column {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
  font-size: 1.06667rem;
}
.van-picker-column__item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 2.93333rem;
  padding: 0 0.26667rem;
  color: #000;
}
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-picker__mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-image: -webkit-linear-gradient(
      top,
      hsla(0, 0%, 100%, 0.9),
      hsla(0, 0%, 100%, 0.4)
    ),
    -webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
  background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.9),
      hsla(0, 0%, 100%, 0.4)
    ),
    linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
  background-repeat: no-repeat;
  background-position: top, bottom;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  pointer-events: none;
}
.van-picker__frame {
  position: absolute;
  top: 50%;
  right: 1.06667rem;
  left: 1.06667rem;
  z-index: 3;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  pointer-events: none;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0.06667rem 0;
}
[class*="van-hairline"]::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid #ebedf0;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
</style>
