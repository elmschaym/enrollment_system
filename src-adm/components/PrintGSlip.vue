<template>
	<div class="_pri _pri_gs">
		<div class="head r">
			<div class="c">
				<div class="a" style="padding-top: 10px">{{ appPreference.client_name_print }}</div>
				<div class="b">{{ appPreference.client_addr_print }}</div>
			</div>
		</div>
		<div class="head o">
			<div class="c">Grade Slip</div>
		</div>
		<div class="head s">
			<div class="x">
				<div class="n">Name: <span style="text-transform: uppercase;">{{ enrollment.student.lastname }}, {{ enrollment.student.firstname }} {{ enrollment.student.middlename }}</span></div>
				<div class="n">Course: <span>{{ enrollment.course.program_type +' '+ enrollment.course.name_alias }}</span></div>
			</div>
			<div class="y">
			</div>
			<div class="z">
				<div class="n ta-r">ID Number: <span class="v ta-r">{{ enrollment.student.school_id }}</span></div>
				<div class="n ta-r">Acad Status: <span class="v ta-r">{{ enrollment.enrollment.acad_status }}</span></div>
			</div>
		</div>
		<div class="data">
			<div class="x">
				<div class="g">
					<div>Name</div>
					<div>Description Title</div>
					<div></div>
					<div>Remarks</div>
					<div>Final Remarks</div>
				</div>
				<div class="h">
					<div class="i" :key="i +'print'+ s.id" v-for="(s,i) in enrollment.enrollment.billing[0].sect_enrol">
						<div>{{ s.subject.code }}</div>
						<div>{{ s.subject.name }}</div>
						<div></div>
						<div>{{ s.grade }}</div>
						<div>{{ s.grade_final }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="date">
			<div>Date Printed: <span>{{ getTodate() }}</span></div>
			<div class="ta-r"><span>{{ tally.totalSubjects }} </span> Subject(s)</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/square';

	export default {
		props: {
			enrollment: {
				type: Object,
				required: true
			},
			tally: {
				type: Object,
				required: false
			}
		},
		data() {
			return {
				appPreference: { id: 0, client_print_name: 'EVERSOFT IT SOLUTIONS', client_addr_print: 'EVERSOFT' }
			}
		},
		methods: {
			getTodate() {
				let today = new Date(),
					dd = today.getDate(),
					mm = today.getMonth() + 1,
					yyyy = today.getFullYear();
				if (dd<10) dd ='0'+ dd;
				if (mm<10) mm = '0'+ mm;
				return yyyy+'-'+mm+'-'+dd;
			}
		},
		created() {
			let app_prefer = this.$storageGet('app_prefer', 'local') || '';
			if (app_prefer)
				this.appPreference = app_prefer;
		}
	}
</script>

