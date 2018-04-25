jQuery(document).ready(function ($) {

    $('.contactform').each(function (index) {
        var instance = $(this).attr('data-instance');
        SetContact(instance);
    });

    function SetContact(instance) {

        /* Options Variable */
        var settingObj = window["contactvars" + instance];

        /* Submit Function */
        function basix_contact_submit() {

            var contactName    = $('#basix-contact-form-' + instance + ' input[name="message_name"]').val();
            var contactEmail   = $('#basix-contact-form-' + instance + ' input[name="message_email"]').val();
            var contactPhone   = $('#basix-contact-form-' + instance + ' input[name="message_phone"]').val();
            var contactMessage = $('#basix-contact-form-' + instance + ' textarea[name="message_text"]').val();
            var contactSubject = settingObj.att_email_subject;
            var contactTo      = settingObj.att_to_address;
            var contactSuccess = settingObj.att_success_message;

            /* Loading icon */
            $('#contact-loading-' + instance).show();

            /* Ajax Request */
            $.ajax({
                       type   : "POST",
                       url    : settingObj.att_ajax_path,
                       data   : {
                           action : "basix_contact_form",
                           name   : contactName,
                           email  : contactEmail,
                           phone  : contactPhone,
                           message: contactMessage,
                           sendto : contactTo,
                           subject: contactSubject,
                           success: contactSuccess,
                           id     : settingObj.att_uniqid
                       },
                       success: function (data) {
                           $('#contact-loading-' + instance).hide();
                           $('#contact_ajaxoutput-' + instance).html(data);
                           $('#basix-contact-form-' + instance)[0].reset();
                           $('.alert span.close').click(function () {
                               $(this).parent('.alert').fadeOut();
                           });
                           $('#contact_ajaxoutput-' + instance + ' .alert').fadeIn();
                       },
                       error  : function (errorThrown) {
                           alert(errorThrown);
                       }
                   });
            return false;
        }

        /* jQuery Validate */
        $('#basix-contact-form-' + instance).validate({
                                                          rules        : {
                                                              message_name : {
                                                                  required : true,
                                                                  minlength: 3
                                                              },
                                                              message_email: {
                                                                  required : true,
                                                                  email    : true,
                                                                  minlength: 3
                                                              },
                                                              message_phone: {
                                                                  required : false,
                                                                  minlength: 5
                                                              },
                                                              message_text : {
                                                                  required : true,
                                                                  minlength: 10
                                                              }
                                                          },
                                                          messages     : {
                                                              required     : settingObj.att_required_msg,
                                                              message_name : settingObj.att_name_msg,
                                                              message_email: settingObj.att_email_msg,
                                                              message_phone: settingObj.att_phone_msg,
                                                              message_text : settingObj.att_message_msg
                                                          },
                                                          submitHandler: basix_contact_submit
                                                      });

    }

});