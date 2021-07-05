<template>
	<div class="_pri _pri_cor">
		<div class="head p">
			<div class="x">
				<div class="n">Unit Allowance</div><div class="v">{{ tally.allowedUnits }}</div>
				<div class="n">Enrolled Units</div><div class="v">{{ tally.enrolledUnits }}</div>
				<div class="n">Academic Status</div><div class="v">{{ enrollment.enrollment.acad_status }}</div>
			</div>
			<div class="y">
				<div class="a" style="padding-top: 10px">{{ appPreference.client_name_print }}</div>
				<div class="b">{{ appPreference.client_addr_print }}</div>
			</div>
			<div class="z">
				<div class="n ta-r">ID Number</div><div class="v ta-r">{{ enrollment.student.school_id }}</div>
				<div class="n ta-r">Semester</div><div class="v ta-r">{{ enrollment.enrollment.semester }} Semester</div>
				<div class="n ta-r">Academic Year</div><div class="v ta-r">{{ enrollment.enrollment.acad_year }}</div>
			</div>
		</div>
		<div class="head o">
			<div class="c">CERTIFICATE OF REGISTRATION (COR)</div>
		</div>
		<div class="head q">
			<div class="x">
				<div class="n">Student Name</div><div class="v" style="text-transform: uppercase;">{{ enrollment.student.lastname }}, {{ enrollment.student.firstname }} {{ enrollment.student.middlename }}</div>
				<div class="n">Course</div><div class="v">{{ enrollment.course.program_type +' '+ enrollment.course.name_alias }}</div>
				<div class="n">Date Admitted</div><div class="v">{{ enrollment.date_admitted }}</div>
			</div>
			<div class="y">
			</div>
			<div class="z">
				<div class="n ta-r">Civil Status</div><div class="v ta-r">{{ parseCivilStatus(enrollment.student.civil_status) }}</div>
				<div class="n ta-r">Religion</div><div class="v ta-r">{{ enrollment.student.religion }}</div>
				<div class="n ta-r">Gender</div><div class="v ta-r">{{ parseGender(enrollment.student.gender) }}</div>
			</div>
		</div>
		<div class="data">
			<div class="x">
				<div class="g">
					<div>Name</div>
					<div>Description Title</div>
					<div>Section</div>
					<div>Schedule</div>
					<div>Room</div>
					<div>Units</div>
				</div>
				<div class="h">
					<div class="i" :key="i +'print'+ s.id" v-for="(s,i) in enrollment.enrollment.billing[0].sect_enrol">
						<div>{{ s.subject.code }}</div>
						<div>{{ s.subject.name }}</div>
						<div>{{ s.section.name }}</div>
						<div>{{ s.section.sched_days +' '+ s.section.sched_time }}</div>
						<div>{{ s.section.room.name }}</div>
						<div>{{ s.subject.units }} </div>
					</div>
				</div>
			</div>
		</div>
		<div class="date">
			<div>Date Confirmed: <span>{{ enrollment.enrollment.confirmed_at }}</span></div>
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
			parseGender(v) {
				return this.$store.state.forms.student.gender.find(x => x.id == v).name;
			},
			parseCivilStatus(v) {
				return this.$store.state.forms.student.civil_status.find(x => x.id == v).name;
			},
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

