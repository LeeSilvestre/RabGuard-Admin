<template>
  <div>
    <button @click="exportToPDF" class="export-button">Export to PDF</button>
    <table ref="table" class="styled-table">
      <thead>
        <tr>
          <th rowspan="2">Province/City<br />Municipalities</th>
          <th colspan="3">Sex</th>
          <th colspan="2">Age</th>
          <th colspan="3">AB Category</th>
          <th rowspan="2">HR</th>
          <th colspan="4">Post Exposure Prophylaxis</th>
          <th rowspan="2">Booster Dose</th>
          <th rowspan="2">PreP</th>
          <th colspan="3">Biting Animal</th>
          <th colspan="2">Wash</th>
        </tr>
        <tr>
          <th>Male</th>
          <th>Female</th>
          <th>Total</th>
          <th>&lt;15</th>
          <th>&gt;15</th>
          <th>Cat I</th>
          <th>Cat II</th>
          <th>Cat III</th>
          <th>TCV</th>
          <th># c. TCV</th>
          <th>HRIG</th>
          <th>ERIG</th>
          <th>Dog</th>
          <th>Cat</th>
          <th>Others</th>
          <th>Yes</th>
          <th>No</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.province" class="table-row">
          <td>{{ row.province }}</td>
          <td>{{ row.sex.male }}</td>
          <td>{{ row.sex.female }}</td>
          <td>{{ row.sex.total }}</td>
          <td>{{ row.age.under15 }}</td>
          <td>{{ row.age.over15 }}</td>
          <td>{{ row.abCategory.catI }}</td>
          <td>{{ row.abCategory.catII }}</td>
          <td>{{ row.abCategory.catIII }}</td>
          <td>{{ row.hr }}</td>
          <td>{{ row.postExposure.tcv }}</td>
          <td>{{ row.postExposure.cTcv }}</td>
          <td>{{ row.postExposure.hrig }}</td>
          <td>{{ row.postExposure.erig }}</td>
          <td>{{ row.boosterDose }}</td>
          <td>{{ row.preP }}</td>
          <td>{{ row.bitingAnimal.dog }}</td>
          <td>{{ row.bitingAnimal.cat }}</td>
          <td>{{ row.bitingAnimal.others }}</td>
          <td>{{ row.wash.yes }}</td>
          <td>{{ row.wash.no }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="1">1st Quarter</td>
          <td>{{ totals.sex.male }}</td>
          <td>{{ totals.sex.female }}</td>
          <td>{{ totals.sex.total }}</td>
          <td>{{ totals.age.under15 }}</td>
          <td>{{ totals.age.over15 }}</td>
          <td>{{ totals.abCategory.catI }}</td>
          <td>{{ totals.abCategory.catII }}</td>
          <td>{{ totals.abCategory.catIII }}</td>
          <td>{{ totals.hr }}</td>
          <td>{{ totals.postExposure.tcv }}</td>
          <td>{{ totals.postExposure.cTcv }}</td>
          <td>{{ totals.postExposure.hrig }}</td>
          <td>{{ totals.postExposure.erig }}</td>
          <td>{{ totals.boosterDose }}</td>
          <td>{{ totals.preP }}</td>
          <td>{{ totals.bitingAnimal.dog }}</td>
          <td>{{ totals.bitingAnimal.cat }}</td>
          <td>{{ totals.bitingAnimal.others }}</td>
          <td>{{ totals.wash.yes }}</td>
          <td>{{ totals.wash.no }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default {
  data() {
    return {
      tableData: [
        {
          province: 'Asinan',
          sex: { male: 5, female: 3, total: 8 },
          age: { under15: 0, over15: 8 },
          abCategory: { catI: 0, catII: 8, catIII: 0 },
          hr: 8,
          postExposure: { tcv: 8, cTcv: 0, hrig: 0, erig: 0 },
          boosterDose: 0,
          preP: 0,
          bitingAnimal: { dog: 5, cat: 3, others: 0 },
          wash: { yes: 8, no: 0 }
        },
        {
          province: 'Banicain',
          sex: { male: 5, female: 12, total: 17 },
          age: { under15: 5, over15: 12 },
          abCategory: { catI: 1, catII: 15, catIII: 1 },
          hr: 17,
          postExposure: { tcv: 17, cTcv: 0, hrig: 0, erig: 0 },
          boosterDose: 0,
          preP: 0,
          bitingAnimal: { dog: 17, cat: 0, others: 0 },
          wash: { yes: 17, no: 0 }
        },
        {
          province: 'Barretto',
          sex: { male: 5, female: 12, total: 17 },
          age: { under15: 5, over15: 12 },
          abCategory: { catI: 1, catII: 15, catIII: 1 },
          hr: 17,
          postExposure: { tcv: 17, cTcv: 0, hrig: 0, erig: 0 },
          boosterDose: 0,
          preP: 0,
          bitingAnimal: { dog: 17, cat: 0, others: 0 },
          wash: { yes: 17, no: 0 }
        },
      ],
      totals: {
        sex: { male: 502, female: 540, total: 1042 },
        age: { under15: 407, over15: 635 },
        abCategory: { catI: 0, catII: 933, catIII: 109 },
        hr: 1042,
        postExposure: { tcv: 1042, cTcv: 1032, hrig: 106, erig: 0 },
        boosterDose: 31,
        preP: 0,
        bitingAnimal: { dog: 530, cat: 512, others: 0 },
        wash: { yes: 1018, no: 24 }
      }
    };
  },
  methods: {
    exportToPDF() {
      nextTick(() => {
        const pdf = new jsPDF();
        const table = this.$refs.table;

        if (!table) {
          console.error("Table reference not found.");
          return;
        }

        html2canvas(table).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190; // Set image width
          const pageHeight = pdf.internal.pageSize.height;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const heightLeft = imgHeight;

          let position = 0;

          // Add the image to the PDF
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          position += heightLeft;

          // Add additional pages if necessary
          while (heightLeft >= pageHeight) {
            position = heightLeft - pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          }

          // Save the PDF
          pdf.save('Rabies and Bite Victim.pdf');
        });
      });
    }
  }
};
</script>

<style scoped>
.export-button {
  background-color: #188754; /* Bootstrap primary color */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

.export-button:hover {
  background-color: #0056b3; /* Darker shade */
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9em;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.styled-table thead tr {
  background-color: #007BFF; /* Bootstrap primary color */
  color: #ffffff;
}

.styled-table th, .styled-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.table-row:hover {
  background-color: #f1f1f1; /* Light gray on hover */
}

.total-row {
  background-color: #ffeb3b; /* Yellow for totals */
  font-weight: bold;
}

tfoot td {
  font-weight: bold;
}
</style>
