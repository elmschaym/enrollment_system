<template>
	<div class="_pri_tor">
		<div class="p1">
			<div class="x">
				<div class="a">
					<span>Ref No. {{ transcript.ref_id }}</span>
				</div>
				<div class="b">
					<div>
						<b>JAMIATUL PHILIPPINE AL-ISLAMIA</b>
						<p>
							{{ sch.address }}<br/>
							Tel No: {{ sch.tel_no }}<br/>
							Email: <u>{{ sch.email }}</u>
						</p>
					</div>
					<div>
						<p>
							ACCREDITED: Charter Member Phillipine Accrediting Association Of Schools, Colleges, and Universities (PAASCU)
						</p>
					</div>
					<div style="text-align: right;">
						<v-icon name="circle"></v-icon>
					</div>
				</div>
				<div class="c">
					OFFICIAL TRANSCRIPT OF RECORDS
				</div>
			</div>
			<div class="y">
				<div class="a">
					<div>
						<span>SURNAME</span>
						<b>{{ student.lastname }}</b>
					</div>
					<div>
						<span>FIRSTNAME</span>
						<b>{{ student.firstname }}</b>
					</div>
					<div>
						<span>MIDDLE NAME</span>
						<b>{{ student.middlename }}</b>
					</div>
					<div>
						<span>STUDENT ID</span>
						<b>{{ student.school_id }}</b>
					</div>
				</div>
				<div class="b">
					<div>
						<div style="display: grid; grid-template-columns: auto 70px 120px 120px">
							<div>
								<span>CITIZENSHIP</span>
								<b>{{ student.citizenship }}</b>
							</div>
							<div>
								<span>SEX</span>
								<b>{{ parseGender(student.gender) }}</b>
							</div>
							<div>
								<span>CIVIL STATUS</span>
								<b>{{ parseCivilStatus(student.civil_status) }}</b>
							</div>
							<div>
								<span>RELIGION</span>
								<b>{{ student.religion }}</b>
							</div>
						</div>
						<div style="display: grid; grid-template-columns: 140px auto">
							<div>
								<span>DATE OF BIRTH</span>
								<b>{{ student.birthdate }}</b>
							</div>
							<div>
								<span>PLACE OF BIRTH</span>
								<b>{{ student.birth_address }}</b>
							</div>
						</div>
						<div>
							<div>
								<span>PARENT/GUARDIAN</span>
								<b>{{ student.father_fname +' '+ student.father_mname +' '+ student.father_lname }}</b>
							</div>
						</div>
						<div>
							<div>
								<span>PERMANENT ADDRESS</span>
								<b>{{ student.home_address }}</b>
							</div>
						</div>
					</div>
					<div style="display: grid; place-items: center; border-top: 1px solid #404040;">
						<img :src="studentPhoto" alt="Photo"/>
					</div>
				</div>
				<div class="c">
					<div class="h">
						PRELIMINARY EDUCATION
					</div>
					<div class="g">
						<div>
							<span>ELEMENTARY</span>
							<b>{{ student.educ_elem_name }}</b>
							<span>YEAR</span>
							<b>{{ student.educ_elem_year }}</b>
						</div>
						<div>
							<span>HIGH SCHOOL</span>
							<b>{{ student.educ_hsjr_name }}</b>
							<span>YEAR</span>
							<b>{{ student.educ_hsjr_year }}</b>
						</div>
						<div v-if="student.educ_col0_name.length > 0">
							<span>COLLEGE</span>
							<b>{{ student.educ_col0_name }}</b>
							<span>YEAR</span>
							<b>{{ student.educ_col0_year }}</b>
						</div>
					</div>
				</div>
				<div class="d">
				</div>
				<div class="e">
					<div class="h">
						GRADING SYSTEM
					</div>
					<div class="g">
						<div class="m">
							<div>RATING</div>
							<div>LETTER</div>
							<div>EQUIVALENT</div>
							<div></div>
							<div>QUALITY</div>
						</div>
						<div class="n">
							<div>
								1.0 <br/> 1.1 - 1.3 <br/> 1.4 - 1.6 <br/> 1.7 - 1.9 <br/> 2.0 - 2.2 <br/> 2.3 - 2.5 <br/> 2.6 - 2.8 <br/> 2.9 - 3.0 <br/> 5.0 <br/> INC, INE, INR, INC=INCOMPLETE <br/> INP=IN PROGRESS
							</div>
							<div>
								A+ <br/> A <br/> A- <br/> B+ <br/> B <br/> B- <br/> C+ <br/> C- <br/> F <br/> W=WITHDRAW
							</div>
							<div>
								100% <br/> 99-97% <br/> 96-94% <br/> 93-91% <br/> 90-88% <br/>87-85% <br/> 84-79% <br/> 78-75% <br/> BELOW 75% <br/> DR=DROPPED
							</div>
							<div>
								<span style="font-size: 24px">}</span> <br/>
								<span style="font-size: 24px">}</span> <br/>
								<span style="font-size: 24px">}</span> <br/>
								<span style="font-size: 24px">}</span> <br/>
							</div>
							<div>
								<span style="line-height: 29px;">EXCELLENT</span> <br/>
								<span style="line-height: 29px;">VERY GOOD</span> <br/>
								<span style="line-height: 29px;">GOOD</span> <br/>
								<span style="line-height: 29px;">FAIR</span> <br/>
								FAILURE <br/> NA=NO ATTENDANCE
							</div>
						</div>
					</div>
				</div>
				<div class="f">
					<div class="h">
						SEMESTER HOURS CREDIT
					</div>
					<div class="g">
						<p>
							A semester credit hour (SCH) is the amount of credit a student earns for successful completion of one contact hour and two preparation hours per week for a semester.
						</p>
						<p>
							One semester hour equals 15-16 contact hours per semester, regardless of the duration of the course.
						</p>
					</div>
				</div>
			</div>
			<div class="z">
				<div class="h">
					<div class="m">REMARKS:</div>
					<div class="n">{{ parseRemarks(tor.remarks) }}</div>
				</div>
				<div class="g">
					<div>
						<i>CHECKED BY:</i>
						<b>{{ sch.checked_by }}</b>
					</div>
					<div>
						<i>PREPARED BY:</i>
						<b>{{ sch.prepared_by }}</b>
					</div>
					<div class="ta-r">
						<b>{{ sch.registrar_oic }}</b>
						<span>University Registrar</span>
					</div>
				</div>
				<div class="f ta-r">
					Page <b>1</b> of <b>{{ subjectGradesP3[0] ? '3' : '2' }}</b> Pages
				</div>
			</div>
		</div>
		<div class="p2">
			<div class="x">
				<div class="a">
					<span>Ref No. {{ (transcript.ref_id+1) }}</span>
				</div>
				<div class="b">
					<div>
						<b>JAMIATUL PHILIPPINE AL-ISLAMIA</b>
						<p>
							{{ sch.address }}<br/>
							Tel No: {{ sch.tel_no }}<br/>
							Email: <u>{{ sch.email }}</u>
						</p>
					</div>
					<div>
						<p>
							ACCREDITED: Charter Member Phillipine Accrediting Association Of Schools, Colleges, and Universities (PAASCU)
						</p>
					</div>
					<div style="text-align: right;">
						<v-icon name="circle"></v-icon>
					</div>
				</div>
				<div class="c">
					OFFICIAL TRANSCRIPT OF RECORDS
				</div>
			</div>
			<div class="y">
				<div class="a">
					<div>
						<span>SURNAME</span>
						<b>{{ student.lastname }}</b>
					</div>
					<div>
						<span>FIRSTNAME</span>
						<b>{{ student.firstname }}</b>
					</div>
					<div>
						<span>MIDDLE NAME</span>
						<b>{{ student.middlename }}</b>
					</div>
					<div>
						<span>STUDENT ID</span>
						<b>{{ student.school_id }}</b>
					</div>
				</div>
				<div class="b">
					<div>
						COURSE AND DESCRIPTIVE TITLE
					</div>
					<div>
						Final<br/>
						Ratings
					</div>
					<div>
						Re-Exam<br/>
						Ratings
					</div>
					<div>
						Units
					</div>
				</div>
				<div class="c">
					<div class="g" v-if="subjectGradesP2.length > 0">
						<div class="i" v-for="(y,i) in subjectGradesP2" :key="'sg_y_'+ i">
							<div class="list" v-if="y.subs.length > 0">
								<div class="n">{{ y.name }}</div>
								<div class="l" v-for="(s,i) in y.subs" :key="'sg_s_'+ y.name +'_'+ i">
									<div>{{ s.subject.code }}</div>
									<div>{{ s.subject.name }}</div>				
									<div class="ta-c">{{ s.grade }}</div>
									<div class="ta-c">{{ s.grade_final }}</div>
									<div class="ta-c">{{ s.subject.units }}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="h" v-if="!subjectGradesP3[0]">
							---------- END OF TRANSCRIPT. NOTHING FOLLOWS ----------
					</div>
					<div class="h" v-else>
							---------- END OF PAGE ----------
					</div>
				</div>
			</div>
			<div class="z">
				<div class="h">
					<div class="m">REMARKS:</div>
					<div class="n">{{ parseRemarks(tor.remarks) }}</div>
				</div>
				<div class="g">
					<div>
						<i>CHECKED BY:</i>
						<b>{{ sch.checked_by }}</b>
					</div>
					<div></div>
					<div class="ta-r">
						<b>{{ sch.registrar_oic }}</b>
						<span>University Registrar</span>
					</div>
				</div>
				<div class="f ta-r">
					Page <b>2</b> of <b>{{ subjectGradesP3[0] ? '3' : '2' }}</b> Pages
				</div>
			</div>
			<div class="p2" v-if="subjectGradesP3[0]">
				<div class="x">
					<div class="a">
						<span>Ref No. {{ (transcript.ref_id+2) }}</span>
					</div>
					<div class="b">
						<div>
							<b>JAMIATUL PHILIPPINE AL-ISLAMIA</b>
							<p>
								{{ sch.address }}<br/>
								Tel No: {{ sch.tel_no }}<br/>
								Email: <u>{{ sch.email }}</u>
							</p>
						</div>
						<div>
							<p>
								ACCREDITED: Charter Member Phillipine Accrediting Association Of Schools, Colleges, and Universities (PAASCU)
							</p>
						</div>
						<div style="text-align: right;">
							<v-icon name="circle"></v-icon>
						</div>
					</div>
					<div class="c">
						OFFICIAL TRANSCRIPT OF RECORDS
					</div>
				</div>
				<div class="y">
					<div class="a">
						<div>
							<span>SURNAME</span>
							<b>{{ student.lastname }}</b>
						</div>
						<div>
							<span>FIRSTNAME</span>
							<b>{{ student.firstname }}</b>
						</div>
						<div>
							<span>MIDDLE NAME</span>
							<b>{{ student.middlename }}</b>
						</div>
						<div>
							<span>STUDENT ID</span>
							<b>{{ student.school_id }}</b>
						</div>
					</div>
					<div class="b">
						<div>
							COURSE AND DESCRIPTIVE TITLE
						</div>
						<div>
							Final<br/>
							Ratings
						</div>
						<div>
							Re-Exam<br/>
							Ratings
						</div>
						<div>
							Units
						</div>
					</div>
					<div class="c">
						<div class="g" v-if="subjectGradesP3[1].length > 0">
							<div class="i" v-for="(y,i) in subjectGradesP3[1]" :key="'sg_y_'+ i">
								<div class="list" v-if="y.subs.length > 0">
									<div class="n">{{ y.name }}</div>
									<div class="l" v-for="(s,i) in y.subs" :key="'sg_s_'+ y.name +'_'+ i">
										<div>{{ s.subject.code }}</div>
										<div>{{ s.subject.name }}</div>				
										<div class="ta-c">{{ s.grade }}</div>
										<div class="ta-c">{{ s.grade_final }}</div>
										<div class="ta-c">{{ s.subject.units }}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="h">
							---------- END OF TRANSCRIPT. NOTHING FOLLOWS ----------
						</div>
					</div>
				</div>
				<div class="z">
					<div class="h">
						<div class="m">REMARKS:</div>
						<div class="n">{{ parseRemarks(tor.remarks) }}</div>
					</div>
					<div class="g">
						<div>
							<i>CHECKED BY:</i>
							<b>{{ sch.checked_by }}</b>
						</div>
						<div></div>
						<div class="ta-r">
							<b>{{ sch.registrar_oic }}</b>
							<span>University Registrar</span>
						</div>
					</div>
					<div class="f ta-r">
						Page <b>3</b> of <b>3</b> Pages
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'vue-awesome/icons/circle';

	export default {
		props: {
			subjGrades: {
				required: true,
				type: Array,
				default() {
					return [];
				}
			},
			transcript: {
				required: true,
				type: Object
			},
			student: {
				required: true,
				type: Object
			},
			school: {
				type: Object,
				required: true
			}
		},
		data() {
			const t = new Date()
			const date = t.getFullYear() +'/'+ (t.getMonth()+1) +'/'+ t.getDate(),
					hh = t.getHours() < 10 ? "0"+ t.getHours() : t.getHours(),
					mm = t.getMinutes() < 10 ? "0"+ t.getMinutes() : t.getMinutes();
			return {
				toDate: date +' '+ hh +':'+ mm,
				remarks: [
					{ id: 'GTC', name: 'GRANTED TRANSFER CREDENTIALS' },
					{ id: 'LBE', name: 'LICENSURE BOARD EXAMINATION' },
					{ id: 'FJA', name: 'FOR JOB APPLICATION' }
				]
			}
		},
		computed: {
			subjectGradesP2() {
				let subj = [], i = 0;
				for (let s of this.subjGrades) {
					let sem = { name: s.name, subs: [] };
					for (let v of s.subs) {
						if (i >= 38)
							break;
						sem.subs.push(v);
						i++;
					}
					subj.push(sem);
				}
				return subj;
			},
			subjectGradesP3() {
				let subj = [], i = 0, hasSubjGrades = false;
				for (let s of this.subjGrades) {
					let sem = { name: s.name, subs: [] };
					for (let v of s.subs) {
						if (i < 38) {
							i++;
							continue;
						}
						sem.subs.push(v);
						hasSubjGrades = true;
					}
					subj.push(sem);
				}
				return [hasSubjGrades, subj];
			},
			tor() {
				return this.transcript;
			},
			studentPhoto() {
				//let api_config = this.$storageGet('api_config', 'local');
				//return api_config.server.slice(0,-4) +'/media/'+ this.student.photo;
				return this.student.photo;
			},
			sch() {
				return this.school;
			}
		},
		methods: {
			parseRemarks(v) {
				let s = this.remarks.find(r => r.id === v);
				if (s)
					return s.name;
				return '';
			},
			parseGender(v) {
				return this.$store.state.forms.student.gender.find(x => x.id == v).name;
			},
			parseCivilStatus(v) {
				return this.$store.state.forms.student.civil_status.find(x => x.id == v).name;
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
._pri_tor { font-size: 12px; position: relative; }
._pri_tor .p1 .x, ._pri_tor .p2 .x {}
._pri_tor .p1 .x .a, ._pri_tor .p2 .x .a { height: 20px; font-weight: 500px; font-size: 13px; color: #404040; }
._pri_tor .p1 .x .b, ._pri_tor .p2 .x .b { height: 80px; display: grid; grid-template-columns: auto 180px 96px; }
._pri_tor .p1 .x .b > div p, ._pri_tor .p2 .x .b > div p { margin: 0; padding: 0; }
._pri_tor .p1 .x .b > div b, ._pri_tor .p2 .x .b > div b { font-size: 14px; padding: 0; }
._pri_tor .p1 .x .b > div svg, ._pri_tor .p2 .x .b > div svg { width: 72px; height: 72px; color: #c0c0c0; margin-top: -6px; }

._pri_tor .p1 .x .c, ._pri_tor .p2 .x .c { color: #fff; font-size: 14px; padding: 2px 4px; background-color: #555555; text-align: center; font-weight: 600; text-transform: uppercase; }

._pri_tor .p1 .y, ._pri_tor .p2 .y { padding-top: 5px; height: 1028px; }
._pri_tor .p1 .y .a, ._pri_tor .p2 .y .a { border-top: 1px solid #404040; border-left: 1px solid #404040; border-right: 1px solid #404040; display: grid; grid-template-columns: 140px auto 140px 90px; }
._pri_tor .p1 .y .a div, ._pri_tor .p2 .y .a div { padding: 4px; }
._pri_tor .p1 .y .a b, ._pri_tor .p2 .y .a b { display: block; padding-top: 6px; text-transform: uppercase; }
._pri_tor .p1 .y .a span, ._pri_tor .p2 .y .a span { display: block; }

._pri_tor .p1 .y .b { display: grid; grid-template-columns: auto 110px; border-bottom: 1px solid #404040; border-right: 1px solid #404040; }
._pri_tor .p1 .y .b img { display: block; height: 96px; width: 96px; background-color: #b0b0b0; }
._pri_tor .p1 .y .b > div > div { border-top: 1px solid #404040; border-left: 1px solid #404040; border-right: 1px solid #404040; }
._pri_tor .p1 .y .b > div > div > div { padding: 4px; }
._pri_tor .p1 .y .b b { display: block; padding-top: 6px; text-transform: uppercase; }
._pri_tor .p1 .y .b span { display: block; }

._pri_tor .p1 .y .c { padding: 12px 0; }
._pri_tor .p1 .y .c .h { font-weight: 600; text-align: center; padding-bottom: 6px; }
._pri_tor .p1 .y .c .g {}
._pri_tor .p1 .y .c .g > div { display: grid; grid-template-columns: 100px auto 60px 80px; padding-bottom: 2px; }
._pri_tor .p1 .y .c .g > div span { display: block; }
._pri_tor .p1 .y .c .g > div b { display: block; font-weight: 600; }

._pri_tor .p1 .y .d { height: 340px; }

._pri_tor .p1 .y .e { padding: 20px 50px; }
._pri_tor .p1 .y .e .h { font-weight: 600; text-align: center; }
._pri_tor .p1 .y .e .g {}
._pri_tor .p1 .y .e .g .m, ._pri_tor .p1 .y .e .g .n { display: grid; grid-template-columns: auto 100px 120px 10px 120px; }
._pri_tor .p1 .y .e .g .m div { font-weight: 600; padding: 4px 0; }
._pri_tor .p1 .y .e .g .n {}
._pri_tor .p1 .y .e .g .n div {}

._pri_tor .p1 .y .f { padding: 0 0 20px 0; }
._pri_tor .p1 .y .f .h { font-weight: 600; text-align: center; padding: 4px 0; }
._pri_tor .p1 .y .f .g p { text-indent: 32px; line-height: 125%; }

._pri_tor .p1 .z, ._pri_tor .p2 .z { border-top: 2px solid #555; padding: 5px 0 0 0; }
._pri_tor .p1 .z .h, ._pri_tor .p2 .z .h { display: grid; grid-template-columns: 70px auto; }
._pri_tor .p1 .z .h .m, ._pri_tor .p2 .z .h .m { padding: 2px; }
._pri_tor .p1 .z .h .n, ._pri_tor .p2 .z .h .n { border-bottom: 1px solid #404040; padding: 2px; text-align: center; font-weight: 600; }
._pri_tor .p1 .z .g, ._pri_tor .p2 .z .g { padding: 20px 0 12px 0; display: grid; grid-template-columns:  180px 120px auto; }
._pri_tor .p1 .z .g b, ._pri_tor .p2 .z .g b { font-weight: 600; display: block; }
._pri_tor .p1 .z .g i, ._pri_tor .p2 .z .g i { display: block; padding-bottom: 4px; }
._pri_tor .p1 .z .g span, ._pri_tor .p2 .z .g span { display: block; padding-top: 4px; }

._pri_tor .p2 {}
._pri_tor .p2 .y .b { display: grid; grid-template-columns: auto 90px 90px 90px; border: 1px solid #404040; border-left: none; border-right: 1px solid #404040; }
._pri_tor .p2 .y .b > div { display: grid; place-items: center; border-left: 1px solid #404040; padding: 4px 0; }

._pri_tor .p2 .y .c, ._pri_tor .p3 .y .c {}
._pri_tor .p2 .y .c .g, ._pri_tor .p3 .y .c .g {}
._pri_tor .p2 .y .c .g .list, ._pri_tor .p3 .y .c .g .list {}
._pri_tor .p2 .y .c .g .list .n, ._pri_tor .p3 .y .c .g .list .n { padding-left: 90px; padding-top: 16px; font-weight: 600; }
._pri_tor .p2 .y .c .g .list .l, ._pri_tor .p2 .y .c .g .list .l { padding: 1px 0; display: grid; grid-template-columns: 90px auto 90px 90px 90px; }
._pri_tor .p2 .y .c .h { padding: 20px 0; text-align: center; color: #505050; font-weight: 600; }
</style>
