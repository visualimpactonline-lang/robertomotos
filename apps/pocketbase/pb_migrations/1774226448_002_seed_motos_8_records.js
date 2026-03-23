/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("motos");

  const record0 = new Record(collection);
    record0.set("nome", "Yamaha YZF-R1");
    record0.set("modelo", "YZF-R1");
    record0.set("preco", 45000);
    record0.set("ano", 2023);
    record0.set("quilometragem", 500);
    record0.set("combustivel", "Gasolina");
    record0.set("tipo", "Esportiva");
    record0.set("marca", "Yamaha");
    record0.set("descricao", "Moto esportiva de alta performance");
    record0.set("status", "dispon\u00edvel");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("nome", "Honda CB 500F");
    record1.set("modelo", "CB 500F");
    record1.set("preco", 28000);
    record1.set("ano", 2022);
    record1.set("quilometragem", 2500);
    record1.set("combustivel", "Gasolina");
    record1.set("tipo", "Esportiva");
    record1.set("marca", "Honda");
    record1.set("descricao", "Moto esportiva vers\u00e1til e confi\u00e1vel");
    record1.set("status", "dispon\u00edvel");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("nome", "Kawasaki Ninja 400");
    record2.set("modelo", "Ninja 400");
    record2.set("preco", 22000);
    record2.set("ano", 2023);
    record2.set("quilometragem", 1200);
    record2.set("combustivel", "Gasolina");
    record2.set("tipo", "Esportiva");
    record2.set("marca", "Kawasaki");
    record2.set("descricao", "Moto esportiva compacta e \u00e1gil");
    record2.set("status", "dispon\u00edvel");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("nome", "Suzuki GSX-R750");
    record3.set("modelo", "GSX-R750");
    record3.set("preco", 35000);
    record3.set("ano", 2021);
    record3.set("quilometragem", 8500);
    record3.set("combustivel", "Gasolina");
    record3.set("tipo", "Esportiva");
    record3.set("marca", "Suzuki");
    record3.set("descricao", "Moto esportiva de m\u00e9dio porte");
    record3.set("status", "dispon\u00edvel");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("nome", "BMW S1000RR");
    record4.set("modelo", "S1000RR");
    record4.set("preco", 65000);
    record4.set("ano", 2023);
    record4.set("quilometragem", 300);
    record4.set("combustivel", "Gasolina");
    record4.set("tipo", "Esportiva");
    record4.set("marca", "BMW");
    record4.set("descricao", "Superbike de alta performance");
    record4.set("status", "dispon\u00edvel");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("nome", "Harley-Davidson Street 750");
    record5.set("modelo", "Street 750");
    record5.set("preco", 38000);
    record5.set("ano", 2022);
    record5.set("quilometragem", 4200);
    record5.set("combustivel", "Gasolina");
    record5.set("tipo", "Cruiser");
    record5.set("marca", "Harley-Davidson");
    record5.set("descricao", "Cruiser cl\u00e1ssica e robusta");
    record5.set("status", "dispon\u00edvel");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("nome", "KTM Duke 390");
    record6.set("modelo", "Duke 390");
    record6.set("preco", 18000);
    record6.set("ano", 2023);
    record6.set("quilometragem", 800);
    record6.set("combustivel", "Gasolina");
    record6.set("tipo", "Naked");
    record6.set("marca", "KTM");
    record6.set("descricao", "Moto naked leve e \u00e1gil");
    record6.set("status", "dispon\u00edvel");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("nome", "Ducati Monster");
    record7.set("modelo", "Monster");
    record7.set("preco", 42000);
    record7.set("ano", 2022);
    record7.set("quilometragem", 3500);
    record7.set("combustivel", "Gasolina");
    record7.set("tipo", "Naked");
    record7.set("marca", "Ducati");
    record7.set("descricao", "Moto naked italiana de qualidade");
    record7.set("status", "dispon\u00edvel");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
