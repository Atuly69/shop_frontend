import Swal from 'sweetalert2'

export const show_alert = (title, text, icon) => {
    return Swal.fire({
        title,
        text,
        icon
    });
}

export const show_del_confirm_alert = (func) => {
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            func();
        }
    });
}
