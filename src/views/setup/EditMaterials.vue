<template>
  <div>
    <div>
      <van-cell
        title="头像"
        is-link
        value="待完善"
        @click="modal.avatar = true"
      />
      <van-cell
        title="用户名"
        is-link
        value="待完善"
        @click="modal.user = true"
      />
      <van-cell
        title="介绍"
        is-link
        value="待完善"
        @click="modal.introduce = true"
      />
      <van-cell title="性别" is-link value="待完善" @click="modal.sex = true" />
      <van-cell
        title="生日"
        is-link
        value="待完善"
        @click="modal.birthday = true"
      />
      <van-cell
        title="地区"
        is-link
        value="待完善"
        @click="modal.zone = true"
      />
    </div>
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
          <self-button class="btn">确定</self-button>
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
          <self-button class="btn">确定</self-button>
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet
      v-model="modal.sex"
      :actions="actionssex"
      cancel-text="取消"
      close-on-click-action
      @select="onSelectSex"
    />
    <van-action-sheet v-model="modal.birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        confirm-button-text="完成"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-action-sheet>
    <van-action-sheet v-model="modal.zone">
      <van-area
        confirm-button-text="完成"
        :area-list="areaList"
        value="110101"
      />
    </van-action-sheet>
  </div>
</template>

<script type="text/ecmascript-6">
import selfButton from '@/components/button'
import {
  Cell,
  ActionSheet,
  Field,
  Area,
  DatetimePicker
} from "vant";
export default {
  data() {
    return {
      actions: [{ name: "拍照" }, { name: "从相册上传" }],
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
      actionssex: [{ name: "男" }, { name: "女" }],
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区',
        }
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // loginout() {
    //   this.$ajax
    //     .post("api/front/member/loginOut.json", {})
    //     .then(() => {
    //       this.$toast('退出成功')
    //     })
    //     .catch(error=> {
    //       this.$toast(error)
    //     });
    // },
    onSelect(item) {
      this.modal.avatar = false;
      if (item.name === "举报用户") {
        this.modal.complaint = true;
      } else {
        Dialog.confirm({
          title: "确定拉黑该用户？？",
          message: "拉黑后此用户不能关注您，也无法给您发送任何消息",
          confirmButtonColor: "rgb(255, 203, 0)"
        })
          .then(() => {
            this.$toast(item.name + "成功");
            // 已解除黑名单
          })
          .catch(() => {});
      }
    },
    onSelectSex(item) {
      console.log(item)
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else {
        return `${val}日`;
      }
      return val;
    },
    
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-cell": Cell,
    "van-action-sheet": ActionSheet,
    'self-button': selfButton,
    'van-field': Field,
    'van-area': Area,
    'van-datetime-picker': DatetimePicker
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
</style>
