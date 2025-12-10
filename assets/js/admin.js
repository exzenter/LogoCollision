/**
 * Admin JavaScript for Context-Aware Animation plugin
 * Handles accordion functionality for effect settings and tab navigation
 */
(function($) {
    'use strict';
    
    $(document).ready(function() {
        // =====================
        // Tab Navigation
        // =====================
        
        // Handle tab clicks
        $('.caa-tabs .nav-tab').on('click', function(e) {
            e.preventDefault();
            
            var tabId = $(this).data('tab');
            
            // Update active tab
            $('.caa-tabs .nav-tab').removeClass('nav-tab-active');
            $(this).addClass('nav-tab-active');
            
            // Show corresponding content
            $('.caa-tab-content').removeClass('caa-tab-active');
            $('#' + tabId).addClass('caa-tab-active');
            
            // Update URL hash without scrolling
            if (history.pushState) {
                history.pushState(null, null, '#' + tabId);
            }
        });
        
        // Check for hash on page load
        var hash = window.location.hash;
        if (hash && $(hash).hasClass('caa-tab-content')) {
            $('.caa-tabs .nav-tab').removeClass('nav-tab-active');
            $('.caa-tabs .nav-tab[data-tab="' + hash.substring(1) + '"]').addClass('nav-tab-active');
            $('.caa-tab-content').removeClass('caa-tab-active');
            $(hash).addClass('caa-tab-active');
        }
        
        // =====================
        // Effect Accordions
        // =====================
        
        // Handle effect radio button changes
        $('.caa-effect-radio').on('change', function() {
            var selectedEffect = $(this).val();
            
            // Hide all accordions
            $('.caa-effect-accordion').slideUp(200);
            
            // Show the accordion for the selected effect
            $('.caa-effect-accordion[data-effect="' + selectedEffect + '"]').slideDown(200);
        });
        
        // Initialize: show accordion for currently selected effect
        var selectedEffect = $('.caa-effect-radio:checked').val();
        if (selectedEffect) {
            $('.caa-effect-accordion[data-effect="' + selectedEffect + '"]').show();
        }
        
        // =====================
        // Pro Version Mappings
        // =====================
        
        var mappingIndex = $('#caa-mappings-list .caa-mapping-row').length;
        
        // Add new mapping row
        $('#caa-add-mapping').on('click', function() {
            var newRow = createMappingRow(mappingIndex);
            var $newRow = $(newRow);
            $('#caa-mappings-list').append($newRow);
            $newRow.slideDown(200);
            mappingIndex++;
        });
        
        // Remove mapping row
        $(document).on('click', '.caa-remove-mapping', function() {
            var $row = $(this).closest('.caa-mapping-row');
            
            // If this is the last row, clear it instead of removing
            if ($('#caa-mappings-list .caa-mapping-row').length === 1) {
                $row.find('input[type="text"]').val('');
                $row.find('select').val('1');
            } else {
                $row.fadeOut(200, function() {
                    $(this).remove();
                });
            }
        });
        
        // Create a new mapping row HTML
        function createMappingRow(index) {
            return '<div class="caa-mapping-row" style="display: none;">' +
                '<div class="caa-mapping-col-selector">' +
                    '<input type="text" name="caa_mappings[' + index + '][selector]" value="" class="regular-text" placeholder="#element-id or .class-name" />' +
                '</div>' +
                '<div class="caa-mapping-col-effect">' +
                    '<select name="caa_mappings[' + index + '][effect]">' +
                        '<option value="1">Effect 1: Scale</option>' +
                        '<option value="2">Effect 2: Blur</option>' +
                        '<option value="3">Effect 3: Slide Text</option>' +
                        '<option value="4">Effect 4: Text Split</option>' +
                        '<option value="5">Effect 5: Character Shuffle</option>' +
                        '<option value="6">Effect 6: Rotation</option>' +
                        '<option value="7">Effect 7: Move Away</option>' +
                    '</select>' +
                '</div>' +
                '<div class="caa-mapping-col-actions">' +
                    '<button type="button" class="button caa-remove-mapping" title="Remove Mapping">' +
                        '<span class="dashicons dashicons-trash"></span>' +
                    '</button>' +
                '</div>' +
            '</div>';
        }
        
    });
})(jQuery);

