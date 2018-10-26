import store from '../store'

// Field validators
export const registerValidate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'FirstName',
    'Lastname',
    'password',
    'passwordConfirmation'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Sähköpostikenttä on pakollinen'
    }
  })

  if (!values['password']) {
    errors.password = 'Salasanakenttä on pakollinen'
  }

  if (
    values['password'] &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values['password'])
  ) {
    errors.password =
      'Virheellinen salasana, Salasanan tulee sisältää vähintään: 8 merkkiä, pieniä ja isoja kirjaimia, numeroita !'
  }

  if (values['password'] !== values['passwordConfirmation']) {
    errors.passwordConfirmation = 'Antamasi salasanat eivät täsmää'
  }

  if (!values['passwordConfirmation']) {
    errors.passwordConfirmation = 'Salasanan vahvistus on pakollinen'
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Antamasi sähköpostiosoite  on virheellinen'
  }

  if (!values['FirstName']) {
    errors.givenName = 'Etunimi on pakollinen'
  }

  if (!values['Lastname']) {
    errors.familyName = 'Sukunimi on pakollinen'
  }

  return errors
}

export const invoiceValidate = values => {
  const errors = {}

  // Customer Info
  const requiredCustomerInfoFields = [
    'company_name',
    'business_id',
    'person_to_contact',
    'person_to_contact_email'
  ]

  let requiredDeliveryMethodFields = []

  if (values['delivery_method'] === 'Verkkolasku') {
    requiredDeliveryMethodFields = ['zip_code', 'city', 'delivery_address', 'web_invoice', 'finvoice_operator']
  } else {
    requiredDeliveryMethodFields = ['zip_code', 'city', 'delivery_address']
  }

  // Invoice Info
  const requiredInvoiceInfoFields = ['job_title']

  const requiredFields = [
    ...requiredCustomerInfoFields,
    ...requiredDeliveryMethodFields,
    ...requiredInvoiceInfoFields
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

  if (!/^\d{5}$/i.test(values['zip_code']) && values['zip_code']) {
    errors['zip_code'] = 'Postinumero ei ole kelvollinen'
  }

  if (
    values.invoice_reference &&
    !/^[äÄöÖåÅA-Za-z0-9.\-_,\s]+$/i.test(values.invoice_reference)
  ) {
    errors['invoice_reference'] = 'Viitenumero ei ole kelvollinen'
  }

  if (
    values.person_to_contact_email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.person_to_contact_email
    )
  ) {
    errors['person_to_contact_email'] =
      'Antamasi sähköpostiosoite  on virheellinen'
  }

  const invoices = store.getState().invoice.invoiceInputRows.map(_ => _.key)

  // Invoice rows
  errors['rows'] = {}

  invoices.forEach(item => {
    errors['rows'][parseInt(item)] = {}
    if (!values['rows'][parseInt(item)]['description']) {
      errors['rows'][parseInt(item)]['description'] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)]['start_date']) {
      errors['rows'][parseInt(item)]['start_date'] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)]['end_date']) {
      errors['rows'][parseInt(item)]['end_date'] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)]['quantity']) {
      errors['rows'][parseInt(item)]['quantity'] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)]['unit']) {
      errors['rows'][parseInt(item)]['unit'] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)]['quantity_price']) {
      errors['rows'][parseInt(item)]['quantity_price'] = 'Pakollinen'
    }
    /* if (!values['rows'][parseInt(item)]['vat_percent']) {
      errors['rows'][parseInt(item)]['vat_percent'] = 'Pakollinen'
    } */
  })

  //console.log('errors:: ', errors)
  return errors
}

export const customerValidate = values => {
  const errors = {}

  // Customer Info
  /*   const requiredCustomerInfoFields = [
    'company_name', 'business_id', 'person_to_contact', 'person_to_contact_email'
  ] */

  //const requiredCustomerInfoFields = ['company_name', 'business_id', 'person_to_contact']

  // Delivery Info
  /*   const requiredDeliveryMethodFields = [
    'delivery_method'
  ] */

  /* const requiredFields = [...requiredCustomerInfoFields, ...requiredDeliveryMethodFields]
  requiredFields.forEach(field => {
    if ( !values[ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  }) */

  const requiredFields = ['company_name', 'business_id', 'person_to_contact', 'person_to_contact_email']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

  if (!/^\d{5}$/i.test(values['zip_code']) && values['zip_code']) {
    errors['zip_code'] = 'Postinumero ei ole kelvollinen'
  }

  if (
    !/^\d(.*)$/i.test(
      values['invoice_reference'] && values['invoice_reference']
    )
  ) {
    errors['invoice_reference'] = 'Viitenumero ei ole kelvollinen'
  }

  if (
    values.person_to_contact_email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.person_to_contact_email
    )
  ) {
    errors.person_to_contact_email =
      'Antamasi sähköpostiosoite  on virheellinen'
  }

  return errors
}

export const profileValidate = values => {
  const errors = {}
  const requiredFields = [
    'lastname',
    'firstname',
    'address',
    'phone',
    'city',
    'account_number'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })
  if (!/^\d{5}$/i.test(values['zip_code']) || !values['zip_code']) {
    errors['zip_code'] = 'Postinumero ei ole kelvollinen'
  }

  return errors
}

export const expenseValidate = values => {
  const errors = {}
  const requiredFields = [
    'invoice',
    'place_of_purchase',
    'date_of_purchase',
    'receipt_picture'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

/*   const editFlag = store.getState().expense.isEdit

  if (values.date_of_purchase) {
    if (
      !editFlag &&
      !/^(\w{3}) (\w{3}) (\d\d) (\d\d\d\d) (\d\d):(\d\d):(\d\d) GMT\+(\d\d\d\d) \(Eastern European Summer Time\)$/i.test(
        values.date_of_purchase
      )
    ) {
      errors['date_of_purchase'] = 'Kenttä on pakollinen'
    }

    if (
      editFlag &&
      !/^\s*([0-9]{4}[-\.]?((0[13-9]|1[012])[-\.]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-\.]?31|02[-\.]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-\.]?02[-\.]?29)\s*$/i.test(
        values.date_of_purchase
      )
    ) {
      errors['date_of_purchase'] =
        'Päiväysmuoto ei ole kelvollinen, kirjoita yyyy-mm-dd'
    }
  } */

  const expenses = store.getState().expense.expenseInputRow.map(_ => _.key)

  errors['expenseInputRow'] = {}

  expenses.forEach(item => {
    errors['expenseInputRow'][item] = {}
    if (values['expenseInputRow'] && errors['expenseInputRow'][item]) {
      if (!values['expenseInputRow'][item][`description${item}`]) {
        errors['expenseInputRow'][item][`description${item}`] =
          'Pakollinen kenttä'
      }
      if (!/^[0-9]*$/i.test(values['expenseInputRow'][item][`sum${item}`])) {
        errors['expenseInputRow'][item][`sum${item}`] =
          'Summa ei ole kelvollinen'
      }
      if (!values['expenseInputRow'][item][`sum${item}`]) {
        errors['expenseInputRow'][item][`sum${item}`] = 'Pakollinen kenttä'
      }
    }
  })

  //console.log('Inside expenseValidateErrors:: ', errors)
  return errors
}

export const allowanceValidate = values => {
  const errors = {}
  const requiredFields = [
    'invoice',
    'destination',
    'country',
    'start_date',
    'start_time',
    'end_date',
    'end_time',
    'allowanceInputRow'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

  if (values.pay_mileage) {
    const requiredMileageFields = ['distance', 'license_plate', 'vehicle_type']

    if (
      !values[requiredMileageFields[0]] ||
      !/^\d+$/.test(values[requiredMileageFields[0]])
    ) {
      errors[requiredMileageFields[0]] = 'Syöte ei ole kelvollinen'
    }

    if (
      values[requiredMileageFields[2]] !== 'Polkupyörä' &&
      !values[requiredMileageFields[1]]
    ) {
      errors[requiredMileageFields[1]] = 'Kenttä on pakollinen'
    }

    if (values[requiredMileageFields[2]] === 'Valitse') {
      errors[requiredMileageFields[2]] = 'Kenttä on pakollinen'
    }
  }

  const routeArrayErrors = []
  if (values.allowanceInputRow)
    for (let index in values.allowanceInputRow) {
      const routeErrors = {}
      if (!values.allowanceInputRow[index].route)
        routeErrors.route = 'Kenttä on pakollinen'
      routeArrayErrors[index] = routeErrors
    }
  routeArrayErrors.filter(_ => !!_.route).length !== 0 &&
    (errors.allowanceInputRow = routeArrayErrors)

  //console.log('Inside allowanceValidateErrors:: ', errors)
  return errors
}

export const yelValidate = values => {
  const errors = {}
  const requiredFields = ['firsttime_enterprenuer', 'yel_income', 'age_group']

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

  return errors
}

export const passwordValidate = values => {
  const errors = {}
  const requiredFields = ['current_pw', 'new_pw', 'check_pw']

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

  if (
    values.new_pw &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.new_pw)
  ) {
    errors.new_pw = 'Virheellinen salasana, noudata ohjeita!'
  }

  if (values['new_pw'] !== values['check_pw']) {
    errors.check_pw = 'Antamasi salasanat eivät täsmää'
  }

  return errors
}

export const resetPasswordValidate = values => {
  const errors = {}
  const requiredFields = ['email']

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Kenttä on pakollinen'
    }
  })

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Antamasi sähköpostiosoite  on virheellinen'
  }

  return errors
}
