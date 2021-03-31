<template>
	<div class="_wrp_cr">
		<div class="p">
			<div class="h">
				<span>{{ department.name }} ({{ department.name_alias }})</span>
			</div>
			<div class="k">
				<div class="a">
					<span>Available Rooms</span>
				</div>
				<div></div>
				<div class="b">
					<button class="active">ALL</button>
					<button>LEC</button>
					<button>LAB</button>
					<button>COM</button>
				</div>
			</div>
			<div class="g">
				<div class="l" v-if="roomsList.length > 0">
					<div class="i" :key="'room_'+ r.id" v-for="(r,i) in roomsList">
						<b @click="viewRoom(r,i)">{{ r.name }}<v-icon name="ellipsis-v"></v-icon> </b>
						<i :class="['x', r.is_available ? 'open' : 'none']"></i>
						<i class="y"></i>
					</div>
				</div>
			</div>
			<ui-loader v-if="isFetchingList" :opacity="0.8"></ui-loader>
		</div>
		<div class="q">
			<div class="s">
				<div  v-if="!isEditingMode" class="h">
					<span>Create New Room</span><v-icon name="plus"></v-icon>
				</div>
				<div  v-else class="h">
					<span>Modify Room</span><v-icon name="edit"></v-icon> 
				</div>
				<div class="f">
					<div class="i">
						<input type="text" v-model="roomCreate.name" maxlength="16" placeholder="Name" />
						<span>Room name. Brief & descriptive. e.g 400</span>
					</div>
					<div class="i" style="display: grid; grid-template-columns: auto 100px">
						<div>
							<ui-select @setValue="setRoomType" :options="roomTypes" :presets="roomTypePreset" :styles="['width: 95%; background-color: #fff']"></ui-select>
							<span>Type</span>
						</div>
						<div>
							<input type="text" v-model="roomCreate.slots" maxlength="2"/>
							<span>Maximum Slots</span>
						</div>
					</div>
					<div class="i">
						<textarea v-model="roomCreate.description" maxlength="255" placeholder="Description, notes"></textarea>
					</div>
					<div class="i c">
						<input type="checkbox" v-model="roomCreate.is_available" /> is available?
					</div>
				</div>
				<div class="b">
					<div class="ta-l">
						<button v-if="isEditingMode" @click="cancelEditMode()">Cancel Edit</button>
						<button v-else>Reset Form</button>
					</div>
					<div class="ta-r">
						<button v-if="isEditingMode" @click="deleteRoom()" style="margin-right: 5px; color: #808080">Delete</button>
						<button v-if="isEditingMode" :disabled="!isFormOkay" @click="submitRoom()">Modify</button>
						<button v-else :disabled="!isFormOkay" @click="submitRoom()">Submit</button>
					</div>
				</div>
			</div>
		</div>        
	</div>
</template>

<script>
	import UISelect from '@/components/UISelect.vue';
	import UILoader from '@/components/UILoader.vue';

	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/plus';
	import 'vue-awesome/icons/ellipsis-v';

	export default {
		components: {
			UiSelect: UISelect,
			UiLoader: UILoader
		},
		data() {
			return {
				isFetchingList: false,
				isSavingForm: false,
				isEditingMode: false,
				department: { name: '', name_alias: '', id: 0 },
				roomsList: [],
				roomCreate: { name: '', structure: '', is_available: false, slots: 15, description: '' },
				room: {},
				roomTypePreset: { id: 'LEC', name: 'Lecture' },
				roomTypes: [
					{ id: 'LEC', name: 'Lecture' },
					{ id: 'LAB', name: 'Laboratory' },
					{ id: 'COM', name: 'Computer' }
				]
			}
		},
		computed: {
			isFormOkay() {
				return this.roomCreate.name.length > 0 && this.roomCreate.slots != '';
			}
		},
		methods: {
			setRoomType(v) {
				this.roomCreate.structure = v;
			},
			viewRoom(r, i) {
				this.isEditingMode = true;
				this.room = r;
				this.roomCreate = r;
				this.roomTypePreset = { id: r.structure, name: (this.roomTypes.find(o => o.id == r.structure)).name }
			},
			cancelEditMode() {
				this.isEditingMode = false;
				this.roomCreate = { name: '', structure: '', is_available: false, slots: 15, description: ' ' };
				this.roomTypePreset = this.roomTypes[0];
			},
			fetchRoomList() {
				this.isFetchingList = true;
				this.$http.get('room/?action=lister&depid='+ this.department.id +'&room_fields=id,name,slots,structure,description,is_available').then(res => {
					this.roomsList = res.data;
				}).finally(() => {
					this.isFetchingList = false;
				});
			},
			submitRoom() {
				this.isSavingForm = true;
				const form = this.isEditingMode ? this.$http.put('room/'+ this.room.id +'/?action=modify-room', { department: this.department.id, ...this.roomCreate }) : this.$http.post('room/?action=submit-room', { department: this.department.id, ...this.roomCreate });
				form.then(res => {
					this.roomCreate = { name: '', structure: '', is_available: false, slots: 15, description: ' ' };
					this.fetchRoomList();
					this.isEditingMode = false;
				}).finally(() => {
					this.isSavingForm = false;
				});
			},
			deleteRoom() {
				this.isSavingForm = true;
				this.$http.delete('room/'+ this.room.id +'/?action=delete-roomr').then(res => {
					this.roomCreate = { name: '', structure: '', is_available: false, slots: 15, description: ' ' };
					this.fetchRoomList();
				}).finally(() => {
					this.isSavingForm = false;
				});
			}
		},
		created() {
			let d = this.$storageGet('user_info').department;
			this.department = d;
		},
		mounted() {
			this.$store.commit('setModuleName', 'Department – Room Manager');
			this.fetchRoomList();
		}
	}
</script>

<style scoped>
	._wrp_cr { height: auto; display: grid; grid-template-columns: auto 270px; }
	._wrp_cr .p { height: 100%; position: relative; background-color: #fff; }
	._wrp_cr .q { height: 100%; border-left: 1px solid #f0f0ea; background-color: #fbfbf7; }

	.p .h { padding: 10px 12px; border-bottom: 1px solid #f0f0ea; background-color: #fbfbf7 }
	.p .h span { font-size: 12px; font-weight: 600; color: #101010; }

	.p .k { padding: 5px 12px; display: grid; grid-template-columns: 130px auto 200px; border-bottom: 1px solid #f8f8f2; }
	.p .k .a span { font-size: 11px; color: #202020; padding: 4px 0; display: block; }
	.p .k .b { text-align: right; }
	.p .k .b button { font-size: 10px; height: 18px; border: 1px solid #eaeaea; background-color: #f5f5f5; padding: 4px 10px; }
	.p .k .b button.active { background-color: #e5e5e5 }

	.p .g { padding: 12px; }
	.p .g .l { background-color: #e0e0da; height: 400px; padding: 10px; display: flex; overflow-y: scroll; flex-wrap: wrap; justify-content: space-between; }
	.p .g .l .i { width: 120px; height: 90px; border: 4px solid #a0a09a; margin: 10px; position: relative; background-color: #e0e0da; }
	.p .g .l .i b { color: #222; font-weight: 600; font-size: 12px; padding: 6px; display: block; background-color: rgba(255,255,255,0.2); cursor: pointer; }
	.p .g .l .i b svg { width: 10px; height: 10px; color: #444; float: right; }
	.p .g .l .i i { display: block; width: 28px; background-color: #a0a09a; position: absolute;  }
	.p .g .l .i i.x { height: 4px; width: 36px; }
	.p .g .l .i i.y { height: 4px; right: 14px; background-color: #e0e0da; bottom: -4px; }
	.p .g .l .i i.x.open { transform: rotate(30deg); bottom: 8px; right: 10px; }
	.p .g .l .i i.x.none { transform: none; bottom: 0; right: 10px; }

	.q .s {}
	.q .s .h { padding: 10px 12px;  border-bottom: 1px solid #f0f0ea; }
	.q .s .h span { font-size: 12px; font-weight: 600; }
	.q .s .h svg { width: 10px; height: 10px; color: #404040; float: right; }
	.q .s .f { padding: 16px 12px 6px 12px; }
	.q .s .f .i { padding-bottom: 10px; }
	.q .s .f .i input[type='text'] { width: 100%; height: 27px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fff; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.q .s .f .i input[type=text]::placeholder { color: #000; }
	.q .s .f .i textarea { width: 100%; height: 70px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fff; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.q .s .f .i textarea::placeholder { color: #000; }
	.q .s .f .i span { display: block; font-size: 10px; color: #404040; padding: 2px; }
	.q .s .f .i input[type='checkbox'] { width: 14px; height: 14px; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.q .s .f .i.c { font-size: 11px; }

	.q .s .b { border-top: 1px solid #f0f0ea; padding: 5px 12px; display: grid; grid-template-columns: 50% 50% }
	.q .s .b button { height: 22px; border-radius: 2px; color: #000; padding: 3px 8px 3px 8px; border: none; background-color: #fcfcfc; font-size: 11px; outline: none; cursor: pointer; border-style: solid; border-width: 1px; border-color: transparent #eaeaea #d0d0d0 #eaeaea; }
	.q .s .b button:disabled { background-color: #fbfbf7; color: #ccc; border-style: solid; border-width: 1px; border-color: transparent #f2f2f2 #e0e0e0 #f2f2f2; }
</style>
