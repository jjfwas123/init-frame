<!--Copyright 2018 -parsent, Dcloud.

 *

 * Licensed under the Apache License, Version 2.0 (the "License");

 * you may not use this file except in compliance with the License.

 * You may obtain a copy of the License at

 *

 *   http://www.apache.org/licenses/LICENSE-2.0

 *

 * Unless required by applicable law or agreed to in writing, software

 * distributed under the License is distributed on an "AS IS" BASIS,

 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and

 * limitations under the License.

 -->

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			this.checkLogin()
		},
		methods: {
			async checkLogin() {
				let data = await HWH5.getStorage({key:'user'})
				if (!data) uni.reLaunch({url: './pages/login/login'});
			}
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import './static/index.css';
	* {
		-webkit-font-smoothing: antialiased; /*chrome、safari*/
		-moz-osx-font-smoothing: grayscale;
	}

	.van-field__body .van-field__control, input::-webkit-input-placeholder {
		color: #969799 !important
	}
	.van-field__body .van-field__control, input::-moz-placeholder {
		color: var(--cell-value-color,#969799) !important
	}
	.van-field__body .van-field__control, input::-moz-placeholder {
		color: var(--cell-value-color,#969799) !important
	}
	.van-field__body .van-field__control, input::-ms-input-placeholder {
		color: var(--cell-value-color,#969799) !important
	}
	.van-tabs__line {
		background-color: #00a450;
	}
	:root {
		--main-color: #00a450;
	}
	view {
		font-size: 28rpx;
		color: #333;
	}
	.uni-input-placeholder {
		color: #b6b6b8;
		font-size: 28rpx;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	} 

	.green{
		color: green;
	}

	.page-box {
		padding: 20rpx;
		background-color: rgba(245, 245, 245, 1);
		min-height: 100vh;
	}

	.inline-block {
		display: inline-block;
	}

	.relative {
		position: relative;
	}

	.gray-bg {
		background-color: rgba(245, 245, 245, 1);
	}

	.vh100 {
		min-height: 100vh;
	}

	.under-line::after {
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 32rpx;
		bottom: 1rpx;
		left: 32rpx;
		border-bottom: 1rpx solid #ebedf0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}
	.over-hiden {
		overflow: hidden;
	}

	.pd30 {
		padding-bottom: 30rpx;
	}

	.blue {
		color: #1890FF;
	}

	.red {
		color: #FF5B5B;
	}

	.font24 {
		font-size: 24rpx;
	}

	.pdt20 {
		padding-top: 20rpx;
	}
	.clearfix {
		display: block;
		content: '';
		height: 0;
		width: 0;
		clear: both;
	}
	.check-box-item {
		margin: 10rpx;
	}

	.loading {
		line-height: 2em;
		text-align: center;
		color: #888;
		margin-top: 30rpx;
	}

	.filter-form {
		height: 92vh;
		overflow-y: auto;
	}

	.form-button {
		margin: 16rpx 0;
		display: flex;
		justify-content: space-around;
		padding: 0 16rpx;
	}
	.form-popup {
		width: 71vw;
	}
	.item-info {
	  width: 100%;
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	.form-submit-btn {
		width: 28vw;
	}
	.form-submit {
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0;
	}
</style>
