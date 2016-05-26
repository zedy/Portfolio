<?php
    $toEmail = "admin@phppot_samples.com"; // change to email kada napravim kroz cpanel
    $mailHeaders = "From: " . $_POST["name"] . "<". $_POST["email"] .">\r\n";
    if (mail($toEmail,  $_POST["subject"], $_POST["body"], $mailHeaders)) {
        $out = "<p class='success'>Mail Sent.</p>";        
        $out .= '<span class="review">Review your email</span>';
        $out .= '<div class="hide emailcontent">';
        $out .= '<p><span>Name: </span>' .$_POST["name"]. '</span></p>';
        $out .= '<p><span>Email: </span>' .$_POST["email"]. '</span></p>';
        $out .= '<p><span>Subject: </span>' .$_POST["subject"]. '</span></p>';
        $out .= '<p style="line-height: 20px;"><span>Content: </span>' .$_POST["body"]. '</span></p>';
        $out .= '</div>';         
    } else {
        $out = "<p class='error'>Problem in Sending Mail.</p>";   
    }
    
    print $out;
?>